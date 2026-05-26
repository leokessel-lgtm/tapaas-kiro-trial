import { access } from "node:fs/promises";
import { constants } from "node:fs";
import { fileURLToPath } from "node:url";
import { readJson, writeJson, writeText } from "./lib/fs.mjs";

const DEFAULT_RAW = "track-2-spike/outputs/raw/figma-file-inventory.json";
const DEFAULT_JSON_OUTPUT = "track-2-spike/outputs/08-file-page-inventory.json";
const DEFAULT_MD_OUTPUT = "track-2-spike/outputs/09-file-page-inventory.md";
const DEFAULT_SELECTION_MD = "track-2-spike/review/known-pages-selection.md";

const STEP_PATTERNS = [
  { key: "privacy", label: "privacy page", pattern: /privacy|terms|condition|acknowledge|consent/i },
  { key: "vehicle-details", label: "vehicle/details page", pattern: /vehicle|plate|registration|details|seller|buyer|disposal/i },
  { key: "review", label: "review page", pattern: /review|check|confirm details|summary/i },
  { key: "confirmation", label: "confirmation page", pattern: /confirmation|complete|success|submitted|receipt|done/i },
  { key: "validation-error", label: "validation/error state", pattern: /error|required|invalid|validation|2\.4|state/i },
  { key: "modal", label: "modal", pattern: /modal|dialog|popup|overlay/i },
  { key: "shell-global-nav", label: "shell/global nav", pattern: /header|footer|nav|navigation|logo|search|breadcrumb/i },
  { key: "component-variant", label: "component/variant, not page", pattern: /component|variant|instance|atom|molecule|organism|button|checkbox|input|field|icon/i }
];

async function exists(path) {
  try {
    await access(path, constants.R_OK);
    return true;
  } catch {
    return false;
  }
}

function walk(node, visit, parentPath = [], depth = 0) {
  if (!node || typeof node !== "object") return;
  visit(node, parentPath, depth);
  const nextPath = [...parentPath, node.name ?? "Unknown"];
  for (const child of Array.isArray(node.children) ? node.children : []) {
    walk(child, visit, nextPath, depth + 1);
  }
}

function childTextSignal(node) {
  const values = [];
  walk(node, (child) => {
    if (child.type === "TEXT" && typeof child.characters === "string") {
      values.push(child.characters);
    }
  });
  return values.slice(0, 25).join(" ");
}

function classifyCandidate(node, parentPath, depth) {
  const text = `${node.name ?? ""} ${childTextSignal(node)}`;
  const matchedFlags = STEP_PATTERNS
    .filter((entry) => entry.pattern.test(text))
    .map((entry) => entry.label);

  const isFrameLike = ["FRAME", "SECTION", "COMPONENT", "COMPONENT_SET", "INSTANCE"].includes(node.type);
  const hasPageSignals = /page|screen|step|privacy|review|confirmation|details|notice of disposal|NOD|^\d+(\.\d+)?[A-Z]?_/i.test(text);
  const hasStateSignals = /error|required|validation|state|variant|hover|focus|disabled|modal|dialog/i.test(text);
  const hasShellSignals = /header|footer|nav|navigation|logo|search|breadcrumb/i.test(text);
  const hasComponentSignals = /component|variant|atom|molecule|button|checkbox|input|icon/i.test(text) || ["COMPONENT", "COMPONENT_SET", "INSTANCE"].includes(node.type);

  let confidence = "low";
  let reason = "Frame-like node with weak page evidence.";
  if (isFrameLike && hasPageSignals && depth <= 4 && !hasShellSignals && !hasComponentSignals) {
    confidence = "high";
    reason = "Top-level or transaction-level frame with page/step naming or visible transaction text.";
  } else if (isFrameLike && hasPageSignals && depth <= 6) {
    confidence = "medium";
    reason = "Frame-like node with page/step naming, but may include state, shell or component signals.";
  } else if (isFrameLike && (hasStateSignals || hasShellSignals || hasComponentSignals)) {
    confidence = "low";
    reason = "Frame-like node appears more likely to be a state, shell element, component or variant than a page.";
  }

  const warning = hasStateSignals
    ? "May be a state/variant rather than a distinct transaction page."
    : hasShellSignals
      ? "May be shell/global navigation rather than transaction page content."
      : hasComponentSignals
        ? "May be a component/variant rather than a transaction page."
        : "";

  return {
    likelyPageConfidence: confidence,
    reason,
    suggestedSafeLabel: safeLabel(node, matchedFlags),
    flags: matchedFlags.length > 0 ? matchedFlags : ["unknown"],
    warning
  };
}

function safeLabel(node, flags) {
  const primary = flags.find((flag) => !/component|shell|modal|validation/.test(flag)) ?? flags[0];
  if (primary) {
    return `${primary} candidate: ${node.name ?? "Unknown"}`;
  }
  return `page/frame candidate: ${node.name ?? "Unknown"}`;
}

function isCandidate(node, depth) {
  if (!["FRAME", "SECTION", "COMPONENT", "COMPONENT_SET", "INSTANCE"].includes(node.type)) {
    return false;
  }
  if (depth > 6) {
    return false;
  }
  const text = `${node.name ?? ""} ${childTextSignal(node)}`;
  return /NOD|notice of disposal|privacy|vehicle|details|review|confirmation|complete|error|modal|page|step|screen|header|footer|nav|component|variant/i.test(text);
}

function sortKey(candidate) {
  const number = candidate.nodeName.match(/\d+(?:\.\d+)?/);
  return [
    candidate.group,
    number ? Number(number[0]) : 999,
    candidate.depth,
    candidate.nodeName
  ].join("|");
}

function buildInventory(raw) {
  const candidates = [];
  walk(raw.document, (node, parentPath, depth) => {
    if (!isCandidate(node, depth)) return;
    const classification = classifyCandidate(node, parentPath, depth);
    const group = classification.flags[0] ?? "unknown";
    candidates.push({
      nodeId: node.id ?? "Unknown",
      nodeName: node.name ?? "Unknown",
      nodeType: node.type ?? "Unknown",
      parentPath: parentPath.join(" / ") || "Root",
      depth,
      likelyPageConfidence: classification.likelyPageConfidence,
      reason: classification.reason,
      suggestedSafeLabel: classification.suggestedSafeLabel,
      warning: classification.warning,
      flags: classification.flags,
      group
    });
  });

  return candidates
    .sort((left, right) => sortKey(left).localeCompare(sortKey(right)))
    .slice(0, 250);
}

function groupCandidates(candidates) {
  return candidates.reduce((groups, candidate) => {
    const key = candidate.group ?? "unknown";
    groups[key] ??= [];
    groups[key].push(candidate);
    return groups;
  }, {});
}

function markdownForInventory(inventory) {
  const lines = [
    "# Experiment 3 File Page Inventory",
    "",
    "## TLDR",
    "",
    inventory.rawAvailable
      ? "This inventory lists likely page/frame candidates from the local file-level Figma inventory. It is for manual known-page selection only."
      : "No local file-level Figma inventory is available yet. Fetch it before selecting known page frames.",
    "",
    "## Boundaries",
    "",
    "- This is not a full transaction extraction.",
    "- Candidate rows are discovery hints, not confirmed transaction pages.",
    "- Do not send raw Figma JSON.",
    "- Do not claim TaPaaS schema compatibility, backend integration or approval readiness.",
    "",
    "## Candidate Summary",
    "",
    `- Raw inventory available: ${inventory.rawAvailable ? "yes" : "no"}`,
    `- Candidate count: ${inventory.candidates.length}`,
    `- Raw source path: \`${inventory.source.rawPath}\``,
    ""
  ];

  for (const [group, candidates] of Object.entries(inventory.groupedCandidates)) {
    lines.push(`## ${group}`);
    lines.push("");
    lines.push("| nodeId | nodeName | type | depth | confidence | warning | safe label |");
    lines.push("|---|---|---|---:|---|---|---|");
    for (const candidate of candidates) {
      lines.push(`| \`${candidate.nodeId}\` | ${candidate.nodeName} | ${candidate.nodeType} | ${candidate.depth} | ${candidate.likelyPageConfidence} | ${candidate.warning || ""} | ${candidate.suggestedSafeLabel} |`);
    }
    lines.push("");
  }

  return `${lines.join("\n")}\n`;
}

function markdownForSelection(inventory) {
  return `# Known Pages Selection

## Purpose

Use this file to choose 3 coherent NOD page frames for Glen review after generating the file page inventory.

## Selection Rules

- Select exactly 3 known page frame node IDs.
- Prefer high-confidence transaction-level frames.
- Preserve the exact Figma node IDs and frame names.
- Avoid validation/error states unless you deliberately want one of the 3 pages to be an error-state page frame.
- Avoid modals, shell/global navigation, component sets, component instances and variants.
- Do not treat candidate rows as confirmed TaPaaS schema pages.

## Suggested Process

1. Review \`track-2-spike/outputs/09-file-page-inventory.md\`.
2. Pick 3 high-confidence page/frame candidates that form a coherent sequence.
3. Copy \`track-2-spike/review/known-pages-selection.template.json\` to \`track-2-spike/review/known-pages-selection.json\`.
4. Replace each \`nodeId\`, \`figmaName\`, \`safeLabel\` and \`whySelected\`.
5. Run the 3-page node export using the selected node IDs.
6. Build the Glen review pack from the curated selection.

## Current Inventory Status

- Raw inventory available: ${inventory.rawAvailable ? "yes" : "no"}
- Candidate count: ${inventory.candidates.length}
- Confirmed transaction pages: Unknown

## Notes For Glen-Safe Framing

Frame the next review as:

> 3 deliberately selected Figma page frames for engineering review.

Do not frame it as:

> 3 confirmed TaPaaS schema pages.
`;
}

export async function buildPageInventory({
  rawPath = DEFAULT_RAW,
  jsonOutputPath = DEFAULT_JSON_OUTPUT,
  markdownOutputPath = DEFAULT_MD_OUTPUT,
  selectionMarkdownPath = DEFAULT_SELECTION_MD
} = {}) {
  const rawAvailable = await exists(rawPath);
  const raw = rawAvailable ? await readJson(rawPath) : null;
  const candidates = rawAvailable ? buildInventory(raw) : [];
  const groupedCandidates = groupCandidates(candidates);

  const inventory = {
    artefactType: "track-2-file-page-inventory",
    version: "0.1",
    experiment: "03-known-page-export-preparation",
    generatedAt: new Date().toISOString(),
    rawAvailable,
    fullTransactionExtracted: false,
    selectedNodeExtraction: false,
    productionReady: false,
    schemaCompatibilityClaim: "none",
    requiresTaPaaSEngineeringReview: true,
    source: {
      rawPath,
      fileName: raw?.name ?? "Unknown",
      lastModified: raw?.lastModified ?? "Unknown"
    },
    candidateCount: candidates.length,
    candidates,
    groupedCandidates,
    unknowns: [
      "Candidate rows are not confirmed transaction pages.",
      "Designer intent, transaction order and page/state relationships need confirmation.",
      "TaPaaS schema compatibility is not claimed."
    ]
  };

  await writeJson(jsonOutputPath, inventory);
  await writeText(markdownOutputPath, markdownForInventory(inventory));
  await writeText(selectionMarkdownPath, markdownForSelection(inventory));

  return {
    rawAvailable,
    candidateCount: candidates.length,
    outputs: {
      json: jsonOutputPath,
      markdown: markdownOutputPath,
      selection: selectionMarkdownPath
    }
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  buildPageInventory()
    .then((result) => {
      console.log(`Built page inventory with ${result.candidateCount} candidate(s).`);
      if (!result.rawAvailable) {
        console.log("No raw file inventory found. Run fetch-file-inventory when live fetch is approved.");
      }
    })
    .catch((error) => {
      console.error(error.message);
      process.exit(1);
    });
}

