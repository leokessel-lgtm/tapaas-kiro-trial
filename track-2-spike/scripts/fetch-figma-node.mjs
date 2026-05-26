import { fileURLToPath } from "node:url";
import { writeJson } from "./lib/fs.mjs";

const DEFAULT_OUTPUT = "track-2-spike/outputs/raw/figma-node-response.json";

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is required for live Figma fetch`);
  }
  return value;
}

export function parseFigmaNodeIds(env = process.env) {
  const multiNodeIds = env.FIGMA_NODE_IDS?.split(",").map((item) => item.trim()).filter(Boolean) ?? [];
  if (multiNodeIds.length > 0) {
    return multiNodeIds;
  }
  return [requireEnv("FIGMA_NODE_ID")];
}

export function figmaNodeUrl(fileKey, nodeIds) {
  const ids = Array.isArray(nodeIds) ? nodeIds : [nodeIds];
  const encodedIds = ids.map((id) => encodeURIComponent(id)).join(",");
  return `https://api.figma.com/v1/files/${fileKey}/nodes?ids=${encodedIds}`;
}

export async function fetchFigmaNode({
  fileKey = requireEnv("FIGMA_FILE_KEY"),
  nodeIds = parseFigmaNodeIds(),
  token = requireEnv("FIGMA_TOKEN"),
  outputPath = DEFAULT_OUTPUT
} = {}) {
  const response = await fetch(figmaNodeUrl(fileKey, nodeIds), {
    headers: {
      "X-Figma-Token": token
    }
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Figma fetch failed: ${response.status} ${response.statusText}\n${body}`);
  }

  const json = await response.json();
  await writeJson(outputPath, json);

  return {
    fileKey,
    nodeIds,
    outputPath
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  fetchFigmaNode()
    .then((result) => {
      console.log(`Fetched Figma node(s) ${result.nodeIds.join(", ")} to ${result.outputPath}`);
    })
    .catch((error) => {
      console.error(error.message);
      process.exit(1);
    });
}
