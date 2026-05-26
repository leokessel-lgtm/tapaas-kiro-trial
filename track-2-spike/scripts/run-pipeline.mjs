import { fileURLToPath } from "node:url";
import { fetchFigmaNode } from "./fetch-figma-node.mjs";
import { normaliseFigmaNode } from "./normalise-figma-node.mjs";
import { validateJsonFile } from "./validate-json.mjs";
import { buildOutputDocs } from "./build-output-docs.mjs";
import { buildReviewPack } from "./build-review-pack.mjs";
import { writeJson } from "./lib/fs.mjs";

const paths = {
  raw: "track-2-spike/outputs/raw/figma-node-response.json",
  evidence: "track-2-spike/outputs/normalised/extracted-evidence.json",
  run: "track-2-spike/outputs/pipeline-run.json",
  rawSchema: "track-2-spike/schemas/figma-node-response.schema.json",
  evidenceSchema: "track-2-spike/schemas/extracted-evidence.schema.json"
};

function step(name, status, detail = "") {
  return { name, status, detail };
}

export async function runPipeline({ fetchRequested = false } = {}) {
  const steps = [];
  const startedAt = new Date().toISOString();

  try {
    if (fetchRequested) {
      const fetched = await fetchFigmaNode({ outputPath: paths.raw });
      steps.push(step("fetch", "success", `Fetched ${fetched.nodeId}`));
    } else {
      steps.push(step("fetch", "skipped", "Using existing raw Figma response"));
    }

    await validateJsonFile(paths.rawSchema, paths.raw);
    steps.push(step("validate raw", "success", paths.raw));

    await normaliseFigmaNode({ rawPath: paths.raw, outputPath: paths.evidence });
    steps.push(step("normalise", "success", paths.evidence));

    await validateJsonFile(paths.evidenceSchema, paths.evidence);
    steps.push(step("validate evidence", "success", paths.evidence));

    await buildOutputDocs({ inputPath: paths.evidence });
    steps.push(step("build docs", "success", "track-2-spike/outputs/docs"));

    await buildReviewPack({ evidencePath: paths.evidence, rawPath: paths.raw });
    steps.push(step("build review pack", "success", "track-2-spike/outputs/02-06 and track-2-spike/docs"));

    const run = {
      status: "success",
      ranAt: startedAt,
      inputs: {
        fileKey: process.env.FIGMA_FILE_KEY ?? "Unknown",
        nodeId: process.env.FIGMA_NODE_ID ?? "Unknown",
        fetchRequested
      },
      steps,
      outputs: {
        raw: paths.raw,
        evidence: paths.evidence,
        docs: "track-2-spike/outputs/docs",
        designIr: "track-2-spike/outputs/02-design-ir.json",
        componentMap: "track-2-spike/outputs/03-component-map.csv",
        flowMap: "track-2-spike/outputs/04-flow-map.json",
        pseudoSchema: "track-2-spike/outputs/05-schema-candidate.pseudo.json",
        gapReport: "track-2-spike/outputs/06-gap-report.md",
        engineeringQuestions: "track-2-spike/docs/engineering-review-questions.md",
        tomorrowSummary: "track-2-spike/docs/tomorrow-summary.md"
      }
    };

    await writeJson(paths.run, run);
    return run;
  } catch (error) {
    const run = {
      status: "failed",
      ranAt: startedAt,
      inputs: {
        fileKey: process.env.FIGMA_FILE_KEY ?? "Unknown",
        nodeId: process.env.FIGMA_NODE_ID ?? "Unknown",
        fetchRequested
      },
      steps: [...steps, step("pipeline", "failed", error.message)],
      outputs: {
        raw: paths.raw,
        evidence: paths.evidence,
        docs: "track-2-spike/outputs/docs",
        designIr: "track-2-spike/outputs/02-design-ir.json",
        componentMap: "track-2-spike/outputs/03-component-map.csv",
        flowMap: "track-2-spike/outputs/04-flow-map.json",
        pseudoSchema: "track-2-spike/outputs/05-schema-candidate.pseudo.json",
        gapReport: "track-2-spike/outputs/06-gap-report.md",
        engineeringQuestions: "track-2-spike/docs/engineering-review-questions.md",
        tomorrowSummary: "track-2-spike/docs/tomorrow-summary.md"
      }
    };

    await writeJson(paths.run, run);
    throw error;
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runPipeline({ fetchRequested: process.argv.includes("--fetch") })
    .then((run) => {
      console.log(`Track 2 pipeline ${run.status}`);
    })
    .catch((error) => {
      console.error(error.message);
      process.exit(1);
    });
}
