import { fileURLToPath } from "node:url";
import { readJson, writeJson } from "./lib/fs.mjs";

const DEFAULT_RAW = "track-2-spike/outputs/raw/figma-node-response.json";
const DEFAULT_OUTPUT = "track-2-spike/outputs/normalised/extracted-evidence.json";

function walk(node, visit) {
  if (!node || typeof node !== "object") {
    return 0;
  }

  let count = 1;
  visit(node);

  for (const child of node.children ?? []) {
    count += walk(child, visit);
  }

  return count;
}

function compactNode(node) {
  return {
    id: node.id,
    name: node.name,
    type: node.type,
    visible: node.visible !== false,
    layoutMode: node.layoutMode,
    primaryAxisSizingMode: node.primaryAxisSizingMode,
    counterAxisSizingMode: node.counterAxisSizingMode,
    absoluteBoundingBox: node.absoluteBoundingBox,
    childCount: node.children?.length ?? 0
  };
}

export async function normaliseFigmaNode({
  rawPath = DEFAULT_RAW,
  outputPath = DEFAULT_OUTPUT,
  fileKey = process.env.FIGMA_FILE_KEY ?? "Unknown",
  nodeId = process.env.FIGMA_NODE_ID ?? "Unknown"
} = {}) {
  const raw = await readJson(rawPath);
  const nodeEntry = raw.nodes?.[nodeId] ?? Object.values(raw.nodes ?? {})[0];

  if (!nodeEntry?.document) {
    throw new Error(`No selected node document found in ${rawPath}`);
  }

  const selected = nodeEntry.document;
  const text = [];
  const instances = [];
  const nodeTypes = new Map();
  const descendantCount = walk(selected, (node) => {
    nodeTypes.set(node.type ?? "UNKNOWN", (nodeTypes.get(node.type ?? "UNKNOWN") ?? 0) + 1);

    if (node.type === "TEXT" && typeof node.characters === "string") {
      text.push({
        id: node.id,
        name: node.name,
        characters: node.characters
      });
    }

    if (node.type === "INSTANCE") {
      instances.push({
        id: node.id,
        name: node.name,
        componentId: node.componentId
      });
    }
  });

  const evidence = {
    source: {
      fileKey,
      nodeId,
      figmaUrl: `https://www.figma.com/file/${fileKey}?node-id=${encodeURIComponent(nodeId)}`,
      extractedAt: new Date().toISOString(),
      rawPath
    },
    summary: {
      fileName: raw.name ?? "Unknown",
      nodeName: selected.name ?? "Unknown",
      nodeType: selected.type ?? "Unknown",
      descendantCount
    },
    selectedNode: {
      ...compactNode(selected),
      nodeTypeCounts: Object.fromEntries([...nodeTypes.entries()].sort())
    },
    text,
    instances,
    unknowns: [
      "Interaction behaviour is Unknown unless explicitly documented in the selected node.",
      "Accessibility behaviour is Unknown until reviewed against source guidance and assistive-technology expectations.",
      "Policy, privacy, legal, eligibility, payment, identity, concession, medical and backend behaviour are out of scope for this extraction."
    ],
    reviewGates: [
      "Confirm selected Figma node and file are the intended Track 2 source.",
      "Review extracted text and instances before using this as implementation evidence.",
      "Keep any future code preview-only unless owner, accessibility and engineering review gates are satisfied."
    ]
  };

  await writeJson(outputPath, evidence);
  return {
    outputPath,
    evidence
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  normaliseFigmaNode()
    .then((result) => {
      console.log(`Normalised Figma evidence to ${result.outputPath}`);
    })
    .catch((error) => {
      console.error(error.message);
      process.exit(1);
    });
}
