import { fileURLToPath } from "node:url";
import { access } from "node:fs/promises";
import { constants } from "node:fs";
import { readJson, writeJson, writeText } from "./lib/fs.mjs";

const PRECISE_SELECTION = "track-2-spike/review/known-page-frame-selection.json";
const FALLBACK_SELECTION = "track-2-spike/review/known-pages-selection.json";
const DEFAULT_EVIDENCE = "track-2-spike/outputs/normalised/extracted-evidence.json";
const DEFAULT_JSON_OUTPUT = "track-2-spike/review/known-pages-glen-input.json";
const DEFAULT_MD_OUTPUT = "track-2-spike/review/known-pages-page-map.md";

async function exists(path) {
  try {
    await access(path, constants.R_OK);
    return true;
  } catch {
    return false;
  }
}

function textValue(item) {
  if (!item || typeof item !== "object") return "";
  return typeof item.characters === "string" ? item.characters : "";
}

function textName(item) {
  if (!item || typeof item !== "object") return "";
  return item.name ?? "";
}

function unique(values, limit = 12) {
  const seen = new Set();
  const output = [];
  for (const value of values.map((item) => String(item ?? "").replace(/\s+/g, " ").trim()).filter(Boolean)) {
    if (!seen.has(value)) {
      seen.add(value);
      output.push(value);
    }
    if (output.length >= limit) break;
  }
  return output;
}

function findText(sourceNode, pattern, limit = 10) {
  return unique((sourceNode.text ?? [])
    .filter((item) => pattern.test(textName(item)) || pattern.test(textValue(item)))
    .map(textValue), limit);
}

function isShellText(value) {
  return /^(change language|account|log out|home|find services|business|find locations|search|acknowledgement of country|find services|service nsw|about us|jobs at service nsw|news|service status|performance dashboard|download the service nsw app|help in your language|contact|contact form|phone 13 77 88|find a service nsw location|find a nsw government agency|accessibility|terms of use|copyright and disclaimer|accessing information|nsw government)$/i.test(String(value ?? "").trim()) ||
    /^(births, relationships and deaths|boating, fishing and outdoors|business, industries and employment|concessions, rebates and assistance|driving and transport|education|emergencies and natural disasters|environment, parks and wildlife|health and care|housing and property|legal and police services)$/i.test(String(value ?? "").trim()) ||
    /^we acknowledge the traditional custodians of nsw/i.test(String(value ?? "").trim());
}

function isShellInstanceName(value) {
  return /header|footer|nav links|navigation|masthead|main header|footer body|footer bottom|logo|nsw government|service nsw|search bar|globe|avatar|signout|chevrondown|breadcrumb|aoc banner/i.test(String(value ?? ""));
}

function shellElements(sourceNode) {
  const shellText = unique((sourceNode.text ?? [])
    .map(textValue)
    .filter(isShellText), 30)
    .map((label) => ({
      label,
      evidenceType: "visible shell/global text",
      mappingStatus: "shell/global candidate",
      schemaTreatment: "exclude-or-inherit; needs Glen confirmation"
    }));

  const shellInstances = unique((sourceNode.instances ?? [])
    .map((item) => item.name)
    .filter(isShellInstanceName), 30)
    .map((label) => ({
      label,
      evidenceType: "shell/global instance",
      mappingStatus: "shell/global candidate",
      schemaTreatment: "exclude-or-inherit; needs Glen confirmation"
    }));

  return [...shellInstances, ...shellText];
}

function likelyHeadings(sourceNode) {
  return findText(sourceNode, /page title|heading|h1|h2|privacy|review|confirmation|details|notice/i, 12)
    .filter((label) => !isShellText(label))
    .slice(0, 8);
}

function likelyFields(sourceNode) {
  return findText(sourceNode, /label|checkbox|input|field|accept|terms|conditions|vehicle|plate|name|email|phone|address/i, 12)
    .filter((label) => !isShellText(label))
    .map((label) => ({
      label,
      mappingStatus: "candidate/inferred",
      confidence: /accept|terms|conditions|vehicle|plate|name|email|phone|address/i.test(label) ? "medium" : "low",
      needsGlenConfirmation: true
    }));
}

function likelyCtas(sourceNode) {
  const ctas = (sourceNode.text ?? []).filter((item) => {
    const value = textValue(item).trim();
    return /button|cta|action|label/i.test(textName(item)) && /^(continue|back|next|submit|cancel|save|start|proceed|exit)$/i.test(value);
  });
  return unique(ctas.map(textValue), 8).map((label) => ({
    label,
    target: "Unknown",
    mappingStatus: "candidate/inferred",
    confidence: "medium",
    needsGlenConfirmation: true
  }));
}

function validationEvidence(sourceNode) {
  return findText(sourceNode, /validation|error|required|your form has an error|check the error|invalid/i, 10)
    .map((message) => ({
      message,
      mappingStatus: "visible-evidence",
      confidence: "high",
      needsGlenConfirmation: true
    }));
}

function componentMappings(sourceNode) {
  const names = unique((sourceNode.instances ?? []).map((item) => item.name), 40);
  const mappings = [];

  const addIf = (candidate, pattern, confidence = "low") => {
    const evidence = names.filter((name) => pattern.test(name)).slice(0, 8);
    if (evidence.length > 0) {
      mappings.push({
        candidate,
        evidence,
        mappingStatus: "candidate/inferred",
        confidence,
        needsGlenConfirmation: true
      });
    }
  };

  addIf("PrivacyNoticeCandidate", /privacy|terms|condition|notice/i, "medium");
  addIf("CheckboxFieldCandidate", /checkbox|accept|terms/i, "medium");
  addIf("ValidationMessageCandidate", /validation|error/i, "medium");
  addIf("PageHeaderCandidate", /page title|form header/i, "low");
  addIf("ProgressStepCandidate", /step|progress/i, "low");
  addIf("ActionAreaCandidate", /button|continue|action/i, "low");

  return mappings;
}

function shellCandidateMappings(sourceNode) {
  const names = unique((sourceNode.instances ?? []).map((item) => item.name), 50);
  const evidence = names.filter(isShellInstanceName).slice(0, 20);
  if (evidence.length === 0) {
    return [];
  }
  return [{
    candidate: "ShellOrGlobalChromeCandidate",
    evidence,
    mappingStatus: "shell/global candidate",
    confidence: "low",
    needsGlenConfirmation: true,
    schemaTreatment: "exclude-or-inherit; do not treat as transaction field evidence"
  }];
}

function asSourceNodes(evidence) {
  return Array.isArray(evidence.sourceNodes) ? evidence.sourceNodes : [];
}

async function defaultSelectionPath() {
  return await exists(PRECISE_SELECTION) ? PRECISE_SELECTION : FALLBACK_SELECTION;
}

function selectionRows(selection) {
  if (Array.isArray(selection.selectedNodes)) {
    return selection.selectedNodes;
  }
  if (Array.isArray(selection.selectedKnownPageFrames)) {
    return selection.selectedKnownPageFrames;
  }
  return [];
}

function normaliseSelection(selection, selectionPath) {
  const pages = selectionRows(selection);
  if (!Array.isArray(pages) || pages.length !== 3) {
    throw new Error(`${selectionPath} must contain exactly 3 selected nodes.`);
  }
  const ids = pages.map((page) => page.nodeId);
  if (new Set(ids).size !== 3) {
    throw new Error(`${selectionPath} must contain 3 unique nodeId values.`);
  }
  const normalisedPages = pages.map((page) => ({
    pageOrder: page.pageOrder,
    nodeId: page.nodeId,
    figmaName: page.figmaName,
    sourceNodeType: page.sourceNodeType,
    safeLabel: page.safeLabel,
    confidence: page.confidence,
    whySelected: page.whySelected,
    requiresConfirmation: page.requiresConfirmation ?? false
  }));
  for (const page of normalisedPages) {
    for (const field of ["pageOrder", "nodeId", "figmaName", "safeLabel", "whySelected"]) {
      if (page[field] === undefined || page[field] === "" || String(page[field]).startsWith("REPLACE_")) {
        throw new Error(`${selectionPath} has an invalid ${field} value.`);
      }
    }
  }
  return {
    selectionPurpose: selection.selectionPurpose,
    fullTransactionExtracted: selection.fullTransactionExtracted ?? false,
    selectedKnownPageFrames: selection.selectedKnownPageFrames !== false && Array.isArray(selection.selectedKnownPageFrames),
    selectedPrecisePageOrInstanceCandidates: selection.selectedPrecisePageOrInstanceCandidates ?? Array.isArray(selection.selectedNodes),
    reviewInstanceRequiresConfirmation: selection.reviewInstanceRequiresConfirmation ?? normalisedPages.some((page) => page.sourceNodeType === "INSTANCE"),
    productionReady: selection.productionReady ?? false,
    schemaCompatibilityClaim: selection.schemaCompatibilityClaim ?? "none",
    warnings: selection.warnings ?? [],
    selectedPages: normalisedPages,
    selectionPath
  };
}

function buildPages(normalisedSelection, evidence, evidencePath) {
  const sourceNodes = asSourceNodes(evidence);
  const byId = new Map(sourceNodes.map((node) => [node.nodeId, node]));

  return normalisedSelection.selectedPages
    .slice()
    .sort((left, right) => left.pageOrder - right.pageOrder)
    .map((selected) => {
      const sourceNode = byId.get(selected.nodeId);
      if (!sourceNode) {
        throw new Error(`Selected node ${selected.nodeId} was not found in ${evidencePath}. Export the 3 selected nodes first.`);
      }
      return {
        pageOrder: selected.pageOrder,
        nodeId: selected.nodeId,
        figmaName: selected.figmaName,
        safeLabel: selected.safeLabel,
        whySelected: selected.whySelected,
        sourceNodeType: selected.sourceNodeType ?? sourceNode.nodeType,
        confidence: selected.confidence ?? "unknown",
        requiresConfirmation: selected.requiresConfirmation ?? false,
        nodeType: sourceNode.nodeType,
        extractedHeadings: likelyHeadings(sourceNode),
        extractedTextSummary: unique((sourceNode.text ?? []).map(textValue), 16),
        likelyFields: likelyFields(sourceNode),
        likelyCtas: likelyCtas(sourceNode),
        likelyValidationEvidence: validationEvidence(sourceNode),
        likelyShellElements: shellElements(sourceNode),
        candidateComponentBlockMappings: componentMappings(sourceNode),
        shellCandidateMappings: shellCandidateMappings(sourceNode),
        unknowns: [
          "Not a confirmed TaPaaS schema page.",
          "Shell/global content may be visible in Figma evidence but is separated from likely transaction fields.",
          "CTA targets are unknown unless explicitly confirmed.",
          "Backend request/response mapping is unknown.",
          "Content approval, accessibility approval, privacy/legal approval, GEL approval and TaPaaS approval are unknown."
        ],
        caveat: selected.sourceNodeType === "INSTANCE" || sourceNode.nodeType === "INSTANCE"
          ? "INSTANCE candidate; requires Glen/Michael confirmation because it is not a clean child FRAME."
          : null
      };
    });
}

function markdownForPack(pack) {
  const lines = [
    "# Known Pages Glen Review Map",
    "",
    "## TLDR",
    "",
    `${pack.framing}. It does not claim they are confirmed TaPaaS schema pages.`,
    "",
    "Shell/global content may still be visible in Figma evidence, but this pack separates it from likely transaction fields.",
    "",
    "## Selected Pages",
    "",
    "| Order | Node ID | Figma name | Type | Safe label |",
    "|---:|---|---|---|---|"
  ];

  for (const page of pack.selectedPages) {
    lines.push(`| ${page.pageOrder} | \`${page.nodeId}\` | ${page.figmaName} | ${page.nodeType} | ${page.safeLabel} |`);
  }

  lines.push("");

  for (const page of pack.selectedPages) {
    lines.push(`## ${page.pageOrder}. ${page.safeLabel}`);
    lines.push("");
    lines.push(`- Node: \`${page.nodeId}\` / ${page.figmaName}`);
    lines.push(`- Type: ${page.nodeType}`);
    lines.push(`- Confidence: ${page.confidence}`);
    lines.push(`- Why selected: ${page.whySelected}`);
    if (page.caveat) {
      lines.push(`- Caveat: ${page.caveat}`);
    }
    lines.push(`- Headings: ${page.extractedHeadings.join("; ") || "Unknown"}`);
    lines.push(`- Likely fields: ${page.likelyFields.map((field) => field.label).join("; ") || "Unknown"}`);
    lines.push(`- Likely CTAs: ${page.likelyCtas.map((cta) => cta.label).join("; ") || "Unknown"}`);
    lines.push(`- Likely shell/global elements: ${page.likelyShellElements.map((item) => item.label).join("; ") || "None detected"}`);
    lines.push(`- Validation evidence: ${page.likelyValidationEvidence.map((item) => item.message).join("; ") || "None detected"}`);
    lines.push("");
  }

  lines.push("## Asks For Glen");
  lines.push("");
  for (const ask of pack.asksForGlen) {
    lines.push(`- ${ask}`);
  }
  lines.push("");
  lines.push("## Do Not Overclaim");
  lines.push("");
  for (const item of pack.doNotOverclaim) {
    lines.push(`- ${item}`);
  }
  lines.push("");

  return `${lines.join("\n")}\n`;
}

export async function buildKnownPagesReviewPack({
  selectionPath,
  evidencePath = DEFAULT_EVIDENCE,
  jsonOutputPath = DEFAULT_JSON_OUTPUT,
  markdownOutputPath = DEFAULT_MD_OUTPUT
} = {}) {
  const resolvedSelectionPath = selectionPath ?? await defaultSelectionPath();
  const selection = await readJson(resolvedSelectionPath);
  const normalisedSelection = normaliseSelection(selection, resolvedSelectionPath);

  const evidence = await readJson(evidencePath);
  const selectedPages = buildPages(normalisedSelection, evidence, evidencePath);
  const includesInstance = selectedPages.some((page) => page.nodeType === "INSTANCE" || page.sourceNodeType === "INSTANCE");
  const framing = includesInstance
    ? "Selected precise page/frame/instance candidates for exploratory engineering review"
    : "3 deliberately selected Figma page frames for engineering review";

  const pack = {
    artefactType: "tapaas-track-2-known-pages-glen-review-candidate",
    version: "0.1",
    reviewPurpose: includesInstance
      ? "Review selected precise page/frame/instance candidates for engineering mapping, without claiming TaPaaS schema compatibility."
      : "Review 3 deliberately selected Figma page frames for engineering mapping, without claiming TaPaaS schema compatibility.",
    framing,
    fullTransactionExtracted: normalisedSelection.fullTransactionExtracted,
    selectedKnownPageFrames: normalisedSelection.selectedKnownPageFrames,
    selectedPrecisePageOrInstanceCandidates: normalisedSelection.selectedPrecisePageOrInstanceCandidates,
    reviewInstanceRequiresConfirmation: normalisedSelection.reviewInstanceRequiresConfirmation,
    productionReady: normalisedSelection.productionReady,
    schemaCompatibilityClaim: normalisedSelection.schemaCompatibilityClaim,
    requiresTaPaaSEngineeringReview: true,
    sourceSummary: {
      selectionPurpose: normalisedSelection.selectionPurpose,
      selectionPath: resolvedSelectionPath,
      selectedCandidateCount: selectedPages.length,
      selectedKnownPageFrameCount: normalisedSelection.selectedKnownPageFrames ? selectedPages.length : 0,
      selectedPrecisePageOrInstanceCandidateCount: normalisedSelection.selectedPrecisePageOrInstanceCandidates ? selectedPages.length : 0,
      evidencePath,
      rawJsonIncluded: false
    },
    selectedPages,
    unknowns: [
      includesInstance
        ? "The selected nodes are precise page/frame/instance candidates, not confirmed TaPaaS schema pages."
        : "The 3 frames are deliberately selected page frames, not confirmed TaPaaS schema pages.",
      "The Review node is an INSTANCE candidate and needs Glen/Michael confirmation.",
      "Shell/global content may be visible in Figma evidence but is separated from likely transaction fields.",
      "Transaction order needs design owner confirmation unless the selected config documents it.",
      "CTA targets, backend mapping and validation contracts remain unknown.",
      "Approval status for content, accessibility, privacy/legal, GEL and TaPaaS is unknown."
    ],
    asksForGlen: [
      "Confirm which TaPaaS schema concepts match each selected page frame.",
      "Confirm which detected fields, CTAs and validation evidence should be represented in schema.",
      "Confirm which shell/global elements should be excluded, inherited or represented.",
      "Provide a minimal schema sample or block catalogue excerpt for the selected page types.",
      "Identify any candidate mappings that are misleading or should be removed."
    ],
    doNotOverclaim: [
      "Do not call these confirmed TaPaaS schema pages.",
      "Do not treat the Review INSTANCE candidate as confirmed page-frame evidence.",
      "Do not claim production readiness.",
      "Do not claim backend integration.",
      "Do not claim TaPaaS schema compatibility.",
      "Do not claim accessibility, privacy/legal, GEL or TaPaaS approval."
    ]
  };

  await writeJson(jsonOutputPath, pack);
  await writeText(markdownOutputPath, markdownForPack(pack));

  return {
    pageCount: selectedPages.length,
    selectionPath: resolvedSelectionPath,
    outputs: {
      json: jsonOutputPath,
      markdown: markdownOutputPath
    }
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  buildKnownPagesReviewPack()
    .then((result) => {
      console.log(`Built known-pages Glen review pack for ${result.pageCount} selected candidate(s) from ${result.selectionPath}.`);
    })
    .catch((error) => {
      console.error(error.message);
      process.exit(1);
    });
}
