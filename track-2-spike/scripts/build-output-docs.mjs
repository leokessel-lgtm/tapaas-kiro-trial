import { fileURLToPath } from "node:url";
import { readJson, writeText } from "./lib/fs.mjs";

const DEFAULT_INPUT = "track-2-spike/outputs/normalised/extracted-evidence.json";
const DEFAULT_DOC_DIR = "track-2-spike/outputs/docs";

function tableRows(items, columns) {
  if (items.length === 0) {
    return "| None captured | |\n|---|---|\n";
  }

  const head = `| ${columns.join(" | ")} |`;
  const divider = `| ${columns.map(() => "---").join(" | ")} |`;
  const rows = items.map((item) => `| ${columns.map((column) => String(item[column] ?? "").replace(/\n/g, "<br>")).join(" | ")} |`);
  return [head, divider, ...rows].join("\n");
}

export async function buildOutputDocs({
  inputPath = DEFAULT_INPUT,
  docDir = DEFAULT_DOC_DIR
} = {}) {
  const evidence = await readJson(inputPath);

  await writeText(`${docDir}/figma-node-summary.md`, `# Figma Node Summary

| Field | Value |
|---|---|
| File key | \`${evidence.source.fileKey}\` |
| Node ID | \`${evidence.source.nodeId}\` |
| File name | ${evidence.summary.fileName} |
| Node name | ${evidence.summary.nodeName} |
| Node type | ${evidence.summary.nodeType} |
| Descendants | ${evidence.summary.descendantCount} |
| Extracted at | ${evidence.source.extractedAt} |
| Raw response | \`${evidence.source.rawPath}\` |

## Node Type Counts

${Object.entries(evidence.selectedNode.nodeTypeCounts ?? {})
  .map(([type, count]) => `- ${type}: ${count}`)
  .join("\n")}

## Review Boundary

This summary is draft design evidence only. It is not a production, accessibility, policy, legal, privacy, GEL or TaPaaS approval.
`);

  await writeText(`${docDir}/extracted-text.md`, `# Extracted Text

${tableRows(evidence.text, ["id", "name", "characters"])}
`);

  await writeText(`${docDir}/component-instances.md`, `# Component Instances

${tableRows(evidence.instances, ["id", "name", "componentId"])}
`);

  await writeText(`${docDir}/unknowns-and-review-gates.md`, `# Unknowns And Review Gates

## Unknowns

${evidence.unknowns.map((item) => `- ${item}`).join("\n")}

## Review Gates

${evidence.reviewGates.map((item) => `- ${item}`).join("\n")}
`);

  return {
    docDir
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  buildOutputDocs()
    .then((result) => {
      console.log(`Built output docs in ${result.docDir}`);
    })
    .catch((error) => {
      console.error(error.message);
      process.exit(1);
    });
}
