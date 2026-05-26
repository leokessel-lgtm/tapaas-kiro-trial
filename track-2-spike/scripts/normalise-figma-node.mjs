import { fileURLToPath } from "node:url";
import { readJson, writeJson } from "./lib/fs.mjs";

const DEFAULT_RAW = "track-2-spike/outputs/raw/figma-node-response.json";
const DEFAULT_OUTPUT = "track-2-spike/outputs/normalised/extracted-evidence.json";

function parseNodeIds(env = process.env) {
  const multiNodeIds = env.FIGMA_NODE_IDS?.split(",").map((item) => item.trim()).filter(Boolean) ?? [];
  if (multiNodeIds.length > 0) {
    return multiNodeIds;
  }
  return env.FIGMA_NODE_ID ? [env.FIGMA_NODE_ID] : [];
}

function walk(node, visit) {
  if (!node || typeof node !== "object") {
    return 0;
  }

  let count = 1;
  visit(node);

  for (const child of Array.isArray(node.children) ? node.children : []) {
    count += walk(child, visit);
  }

  return count;
}

function isTextNode(node) {
  return node?.type === "TEXT" && typeof node.characters === "string";
}

function getNodeText(node) {
  return isTextNode(node) ? node.characters : "";
}

function compactNode(node) {
  return {
    id: node?.id ?? "Unknown",
    name: node?.name ?? "Unknown",
    type: node?.type ?? "Unknown",
    visible: node?.visible !== false,
    layoutMode: node?.layoutMode,
    primaryAxisSizingMode: node?.primaryAxisSizingMode,
    counterAxisSizingMode: node?.counterAxisSizingMode,
    absoluteBoundingBox: node?.absoluteBoundingBox ?? null,
    childCount: Array.isArray(node?.children) ? node.children.length : 0
  };
}

function nodeText(node) {
  const text = [];
  walk(node, (child) => {
    if (isTextNode(child)) {
      text.push({
        id: child.id ?? "Unknown",
        name: child.name ?? "Unknown",
        characters: getNodeText(child)
      });
    }
  });
  return text;
}

function nodeInstances(node) {
  const instances = [];
  walk(node, (child) => {
    if (child?.type === "INSTANCE") {
      instances.push({
        id: child.id ?? "Unknown",
        name: child.name ?? "Unknown",
        componentId: child.componentId ?? child.mainComponent?.id ?? child.componentProperties?.componentId
      });
    }
  });
  return instances;
}

function likelyText(text, pattern) {
  return text
    .filter((item) => pattern.test(item.name ?? "") || pattern.test(typeof item.characters === "string" ? item.characters : ""))
    .map((item) => ({
      id: item.id ?? "Unknown",
      name: item.name ?? "Unknown",
      characters: typeof item.characters === "string" ? item.characters : "",
      mappingStatus: "inferred"
    }));
}

function likelyValidationText(text) {
  return text
    .filter((item) => {
      const name = item.name ?? "";
      const value = typeof item.characters === "string" ? item.characters.trim() : "";
      return /validation|error summary|required/i.test(name) ||
        /^your form has an error$/i.test(value) ||
        /^check the error:?$/i.test(value) ||
        /^accept the terms and conditions to continue\.?$/i.test(value) ||
        /required field|required-field|is required/i.test(value);
    })
    .map((item) => ({
      id: item.id ?? "Unknown",
      name: item.name ?? "Unknown",
      characters: typeof item.characters === "string" ? item.characters : "",
      mappingStatus: "inferred"
    }));
}

function likelyCtaText(text) {
  return text
    .filter((item) => {
      const name = item.name ?? "";
      const value = typeof item.characters === "string" ? item.characters : "";
      return /button|cta|action|label/i.test(name) && /^(continue|back|next|submit|cancel|save|start|proceed)$/i.test(value.trim());
    })
    .map((item) => ({
      id: item.id ?? "Unknown",
      name: item.name ?? "Unknown",
      characters: typeof item.characters === "string" ? item.characters : "",
      mappingStatus: "inferred"
    }));
}

function summariseSourceNode({ nodeId, nodeEntry, sourceOrder }) {
  const selected = nodeEntry?.document;
  if (!selected) {
    return {
      nodeId,
      nodeName: "Unknown",
      nodeType: "Unknown",
      sourceOrder,
      descendantCount: 0,
      selectedNode: compactNode(null),
      text: [],
      instances: [],
      likelyFields: [],
      likelyCtas: [],
      likelyValidationEvidence: []
    };
  }

  const text = nodeText(selected);
  const instances = nodeInstances(selected);
  const nodeTypes = new Map();
  const descendantCount = walk(selected, (node) => {
    nodeTypes.set(node.type ?? "UNKNOWN", (nodeTypes.get(node.type ?? "UNKNOWN") ?? 0) + 1);
  });

  return {
    nodeId,
    nodeName: selected.name ?? "Unknown",
    nodeType: selected.type ?? "Unknown",
    sourceOrder,
    descendantCount,
    selectedNode: {
      ...compactNode(selected),
      nodeTypeCounts: Object.fromEntries([...nodeTypes.entries()].sort())
    },
    text,
    instances,
    likelyFields: likelyText(text, /label|checkbox|input|field|accept|terms|conditions/i),
    likelyCtas: likelyCtaText(text),
    likelyValidationEvidence: likelyValidationText(text)
  };
}

export async function normaliseFigmaNode({
  rawPath = DEFAULT_RAW,
  outputPath = DEFAULT_OUTPUT,
  fileKey = process.env.FIGMA_FILE_KEY ?? "Unknown",
  nodeId = process.env.FIGMA_NODE_ID ?? "Unknown",
  nodeIds = parseNodeIds()
} = {}) {
  const raw = await readJson(rawPath);
  const rawNodeIds = Object.keys(raw.nodes ?? {});
  const orderedNodeIds = (nodeIds.length > 0 ? nodeIds : rawNodeIds).filter((id) => raw.nodes?.[id]);
  const sourceNodes = orderedNodeIds.map((id, index) => summariseSourceNode({
    nodeId: id,
    nodeEntry: raw.nodes[id],
    sourceOrder: index + 1
  }));
  const firstSourceNode = sourceNodes[0];
  const nodeEntry = raw.nodes?.[nodeId] ?? raw.nodes?.[firstSourceNode?.nodeId] ?? Object.values(raw.nodes ?? {})[0];

  if (!nodeEntry?.document) {
    throw new Error(`No selected node document found in ${rawPath}`);
  }

  const selected = nodeEntry.document;
  const text = sourceNodes.flatMap((sourceNode) => sourceNode.text);
  const instances = sourceNodes.flatMap((sourceNode) => sourceNode.instances);
  const nodeTypes = new Map();
  const descendantCount = walk(selected, (node) => {
    nodeTypes.set(node.type ?? "UNKNOWN", (nodeTypes.get(node.type ?? "UNKNOWN") ?? 0) + 1);
  });

  const evidence = {
    source: {
      fileKey,
      nodeId: firstSourceNode?.nodeId ?? nodeId,
      nodeIds: sourceNodes.map((sourceNode) => sourceNode.nodeId),
      figmaUrl: `https://www.figma.com/file/${fileKey}?node-id=${encodeURIComponent(firstSourceNode?.nodeId ?? nodeId)}`,
      extractedAt: new Date().toISOString(),
      rawPath
    },
    summary: {
      fileName: raw.name ?? "Unknown",
      nodeName: selected.name ?? "Unknown",
      nodeType: selected.type ?? "Unknown",
      descendantCount
    },
    sourceNodes,
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
