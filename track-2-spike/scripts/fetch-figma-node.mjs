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

export function figmaNodeUrl(fileKey, nodeId) {
  const params = new URLSearchParams({ ids: nodeId });
  return `https://api.figma.com/v1/files/${fileKey}/nodes?${params.toString()}`;
}

export async function fetchFigmaNode({
  fileKey = requireEnv("FIGMA_FILE_KEY"),
  nodeId = requireEnv("FIGMA_NODE_ID"),
  token = requireEnv("FIGMA_TOKEN"),
  outputPath = DEFAULT_OUTPUT
} = {}) {
  const response = await fetch(figmaNodeUrl(fileKey, nodeId), {
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
    nodeId,
    outputPath
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  fetchFigmaNode()
    .then((result) => {
      console.log(`Fetched Figma node ${result.nodeId} to ${result.outputPath}`);
    })
    .catch((error) => {
      console.error(error.message);
      process.exit(1);
    });
}
