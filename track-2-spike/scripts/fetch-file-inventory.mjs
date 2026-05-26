import { fileURLToPath } from "node:url";
import { writeJson } from "./lib/fs.mjs";

const DEFAULT_OUTPUT = "track-2-spike/outputs/raw/figma-file-inventory.json";
const DEFAULT_DEPTH = "2";

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is required for live Figma file inventory fetch`);
  }
  return value;
}

function fileInventoryUrl(fileKey, depth = DEFAULT_DEPTH) {
  const url = new URL(`https://api.figma.com/v1/files/${encodeURIComponent(fileKey)}`);
  if (depth) {
    url.searchParams.set("depth", depth);
  }
  return url.toString();
}

async function errorMessageFor(response) {
  if (response.status === 429) {
    return "Figma file inventory fetch was rate limited with HTTP 429. Wait before retrying; no raw output was written.";
  }

  const body = await response.text();
  return `Figma file inventory fetch failed: ${response.status} ${response.statusText}\n${body}`;
}

export async function fetchFileInventory({
  fileKey = requireEnv("FIGMA_FILE_KEY"),
  token = requireEnv("FIGMA_TOKEN"),
  depth = process.env.FIGMA_FILE_DEPTH ?? DEFAULT_DEPTH,
  outputPath = DEFAULT_OUTPUT
} = {}) {
  const response = await fetch(fileInventoryUrl(fileKey, depth), {
    headers: {
      "X-Figma-Token": token
    }
  });

  if (!response.ok) {
    throw new Error(await errorMessageFor(response));
  }

  const json = await response.json();
  await writeJson(outputPath, json);

  return {
    fileKey,
    depth,
    outputPath
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  fetchFileInventory()
    .then((result) => {
      console.log(`Fetched Figma file inventory to ${result.outputPath}`);
      console.log("Raw output is ignored and must not be committed.");
    })
    .catch((error) => {
      console.error(error.message);
      console.error("No token value was printed. Raw file-level payloads must remain ignored and not for commit.");
      process.exit(1);
    });
}

