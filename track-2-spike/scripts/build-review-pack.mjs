import { fileURLToPath } from "node:url";
import { readJson, writeJson, writeText } from "./lib/fs.mjs";

const DEFAULT_EVIDENCE = "track-2-spike/outputs/normalised/extracted-evidence.json";
const DEFAULT_OUTPUT_DIR = "track-2-spike/outputs";
const DEFAULT_DOC_DIR = "track-2-spike/docs";
const SOURCE = "figma-rest-api-private-rd-spike";

function statusFor(value, fallback = "unknown") {
  return value && value !== "Unknown" ? "verified" : fallback;
}

function asSourceNodes(evidence) {
  if (Array.isArray(evidence.sourceNodes) && evidence.sourceNodes.length > 0) {
    return evidence.sourceNodes;
  }
  return [{
    nodeId: evidence.source.nodeId,
    nodeName: evidence.summary.nodeName,
    nodeType: evidence.summary.nodeType,
    sourceOrder: 1,
    descendantCount: evidence.summary.descendantCount,
    text: evidence.text ?? [],
    instances: evidence.instances ?? [],
    likelyFields: [],
    likelyCtas: [],
    likelyValidationEvidence: [],
    selectedNode: evidence.selectedNode
  }];
}

function textValue(item) {
  if (!item || typeof item !== "object") {
    return "";
  }
  if (typeof item.characters === "string") {
    return item.characters;
  }
  if (typeof item.value === "string") {
    return item.value;
  }
  return "";
}

function textName(item) {
  if (!item || typeof item !== "object") {
    return "";
  }
  return item.name ?? item.nodeName ?? "";
}

function findText(sourceNode, pattern) {
  return (sourceNode.text ?? []).find((item) => pattern.test(textName(item)) || pattern.test(textValue(item)));
}

function findAllText(sourceNode, pattern) {
  return (sourceNode.text ?? []).filter((item) => pattern.test(textName(item)) || pattern.test(textValue(item)));
}

function likelyFields(sourceNode) {
  const explicit = sourceNode.likelyFields ?? [];
  if (explicit.length > 0) return explicit;
  return findAllText(sourceNode, /label|checkbox|input|field|accept|terms|conditions/i);
}

function likelyCtas(sourceNode) {
  const explicit = sourceNode.likelyCtas ?? [];
  if (explicit.length > 0) return explicit;
  return (sourceNode.text ?? []).filter((item) => {
    const name = textName(item);
    const value = textValue(item).trim();
    return /button|cta|action|label/i.test(name) && /^(continue|back|next|submit|cancel|save|start|proceed)$/i.test(value);
  });
}

function likelyValidation(sourceNode) {
  const explicit = sourceNode.likelyValidationEvidence ?? [];
  if (explicit.length > 0) return explicit;
  return (sourceNode.text ?? []).filter((item) => {
    const name = textName(item);
    const value = textValue(item).trim();
    return /validation|error summary|required/i.test(name) ||
      /^your form has an error$/i.test(value) ||
      /^check the error:?$/i.test(value) ||
      /^accept the terms and conditions to continue\.?$/i.test(value) ||
      /required field|required-field|is required/i.test(value);
  });
}

function pageRole(sourceNode) {
  const name = (sourceNode.nodeName ?? "").toLowerCase();
  const validation = likelyValidation(sourceNode);
  const acknowledgement = likelyFields(sourceNode).some((item) => /accept the terms and conditions/i.test(textValue(item)));
  if (name.includes("error") || validation.length > 0) return "validation-error-state";
  if (acknowledgement) return "normal-or-acknowledgement-state";
  if (name.includes("privacy") || /privacy/i.test((sourceNode.text ?? []).map(textValue).join(" "))) return "normal-or-acknowledgement-state";
  return "unknown";
}

function componentIntent(name) {
  const normalised = (name ?? "").toLowerCase();
  if (normalised.includes("privacy")) return "privacy notice and consent step";
  if (normalised.includes("checkbox")) return "mandatory acknowledgement input";
  if (normalised.includes("continue")) return "primary continue CTA";
  if (normalised.includes("header")) return "service header";
  if (normalised.includes("footer")) return "service footer";
  if (normalised.includes("breadcrumb")) return "breadcrumb navigation";
  if (normalised.includes("step")) return "step indicator";
  if (normalised.includes("nav")) return "global navigation";
  if (normalised.includes("validation") || normalised.includes("error")) return "validation message";
  return "supporting visual or layout component";
}

function blockTypeCandidate(intent, name) {
  const text = `${intent} ${name}`.toLowerCase();
  if (text.includes("privacy")) return "PrivacyNoticeCandidate";
  if (text.includes("checkbox") || text.includes("acknowledgement")) return "CheckboxFieldCandidate";
  if (text.includes("continue") || text.includes("cta")) return "ActionAreaCandidate";
  if (text.includes("validation") || text.includes("error")) return "ValidationMessageCandidate";
  if (text.includes("step")) return "ProgressStepCandidate";
  if (text.includes("header")) return "PageHeaderCandidate";
  if (text.includes("footer")) return "FooterCandidate";
  if (text.includes("breadcrumb")) return "BreadcrumbCandidate";
  return "LayoutOrContentCandidate";
}

function csvEscape(value) {
  const text = String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function toCsv(rows, columns) {
  return [columns.join(","), ...rows.map((row) => columns.map((column) => csvEscape(row[column])).join(","))].join("\n") + "\n";
}

function textSet(sourceNode) {
  return new Set((sourceNode.text ?? []).map((item) => textValue(item).trim()).filter(Boolean));
}

function difference(left, right) {
  return [...left].filter((value) => !right.has(value)).sort();
}

function uniqueTextItems(items) {
  const seen = new Set();
  return items.filter((item) => {
    const value = textValue(item).trim();
    if (!value || seen.has(value)) {
      return false;
    }
    seen.add(value);
    return true;
  });
}

function buildPages(sourceNodes) {
  return sourceNodes.map((sourceNode, index) => {
    const title = findText(sourceNode, /Page title|Privacy$/i);
    const transactionName = findText(sourceNode, /Page label|transaction name|Submit a notice/i);
    const heading = findText(sourceNode, /Privacy collection notice/i);
    const fields = likelyFields(sourceNode);
    const ctas = likelyCtas(sourceNode);
    const validation = likelyValidation(sourceNode);
    return {
      id: `source-${index + 1}`,
      sourceNodeId: sourceNode.nodeId,
      sourceName: sourceNode.nodeName,
      sourceType: sourceNode.nodeType,
      sourceOrder: sourceNode.sourceOrder,
      role: pageRole(sourceNode),
      mappingStatus: "verified",
      visualEvidence: {
        nodeName: sourceNode.nodeName,
        nodeType: sourceNode.nodeType,
        descendantCount: sourceNode.descendantCount,
        textNodeCount: sourceNode.text?.length ?? 0,
        instanceCount: sourceNode.instances?.length ?? 0
      },
      transactionIntent: {
        status: "inferred",
        name: textValue(transactionName) || "Unknown",
        pageTitle: textValue(title) || sourceNode.nodeName,
        purpose: validation.length > 0
          ? "Candidate validation/error state for the selected transaction page."
          : "Candidate normal state for the selected transaction page."
      },
      sections: [{
        id: `source-${index + 1}-section-main`,
        sourceNodeId: heading?.id ?? sourceNode.nodeId,
        sourceName: heading?.name ?? sourceNode.nodeName,
        sourceType: heading ? "TEXT" : sourceNode.nodeType,
        mappingStatus: statusFor(heading, "inferred"),
        intent: "candidate transaction content section",
        blocks: [
          {
            id: `source-${index + 1}-block-content`,
            blockTypeCandidate: "PrivacyNoticeCandidate",
            sourceNodeId: heading?.id ?? sourceNode.nodeId,
            sourceName: heading?.name ?? "Candidate content block",
            mappingStatus: statusFor(heading, "inferred"),
            visualEvidence: findAllText(sourceNode, /Privacy collection notice|personal information|Privacy Collection notice|terms and conditions/i),
            transactionIntent: "Display privacy and terms content. Candidate only until TaPaaS block catalogue confirms fit."
          },
          {
            id: `source-${index + 1}-block-fields`,
            blockTypeCandidate: "CheckboxFieldCandidate",
            sourceNodeId: fields[0]?.id ?? sourceNode.nodeId,
            sourceName: fields[0]?.name ?? "Candidate fields",
            mappingStatus: fields.length > 0 ? "inferred" : "unknown",
            fields: fields.map((field, fieldIndex) => ({
              id: `source-${index + 1}-field-${fieldIndex + 1}`,
              sourceNodeId: field.id,
              sourceName: field.name,
              label: textValue(field),
              inputTypeCandidate: /accept|terms|checkbox/i.test(`${field.name} ${textValue(field)}`) ? "checkbox" : "unknown",
              required: validation.length > 0 ? "inferred" : "unknown",
              mappingStatus: "inferred"
            })),
            validation: validation.map((item) => ({
              sourceNodeId: item.id,
              sourceName: item.name,
              message: textValue(item),
              mappingStatus: "verified"
            }))
          }
        ]
      }],
      ctas: (ctas.length > 0 ? ctas : [{ id: null, name: "Unknown", characters: "Unknown" }]).map((cta, ctaIndex) => ({
        id: `source-${index + 1}-cta-${ctaIndex + 1}`,
        label: textValue(cta),
        sourceNodeId: cta.id,
        sourceName: cta.name,
        mappingStatus: cta.id ? "verified" : "unknown",
        navigationHint: {
          targetPage: "Unknown",
          status: "unknown",
          evidence: "No explicit cross-page prototype link is confirmed by this no-fetch review."
        }
      })),
      textContent: sourceNode.text ?? []
    };
  });
}

function buildDesignIr(evidence) {
  const sourceNodes = asSourceNodes(evidence);
  return {
    productionReady: false,
    requiresTaPaaSEngineeringReview: true,
    schemaCompatibilityClaim: "none",
    source: SOURCE,
    experiment: "02-controlled-multi-node",
    generatedAt: new Date().toISOString(),
    sourceEvidence: {
      fileKey: evidence.source.fileKey,
      nodeIds: sourceNodes.map((node) => node.nodeId),
      rawPath: evidence.source.rawPath,
      normalisedPath: DEFAULT_EVIDENCE,
      sourceNodeCount: sourceNodes.length
    },
    boundaries: {
      visualEvidence: "Figma node hierarchy, text, instances and simple extraction hints.",
      transactionIntent: "Inferred only from labels, frame names and visible validation/error text.",
      blockTypes: "All TaPaaS block types are candidates until confirmed against Glen's schema sample and the TaPaaS block catalogue."
    },
    sourceNodes: sourceNodes.map((node) => ({
      nodeId: node.nodeId,
      nodeName: node.nodeName,
      nodeType: node.nodeType,
      sourceOrder: node.sourceOrder,
      evidenceLink: evidence.source.fileKey === "Unknown" ? null : `https://www.figma.com/file/${evidence.source.fileKey}?node-id=${encodeURIComponent(node.nodeId)}`,
      mappingStatus: "verified"
    })),
    pages: buildPages(sourceNodes),
    unknowns: [
      "The real TaPaaS schema shape is Unknown until a schema sample is supplied.",
      "OpenAPI/Swagger request and response fields are Unknown.",
      "Content, legal and privacy approval status is Unknown.",
      "Designer intent for node-to-node state relationships needs confirmation."
    ]
  };
}

function buildComponentMap(evidence) {
  const rows = [];
  for (const sourceNode of asSourceNodes(evidence)) {
    for (const instance of sourceNode.instances ?? []) {
      const sourceName = instance?.name ?? "Unknown";
      const intent = componentIntent(sourceName);
      rows.push({
        sourceNodeId: instance?.id ?? "Unknown",
        sourceName,
        sourceType: "INSTANCE",
        componentIntent: intent,
        tapaasBlockTypeCandidate: blockTypeCandidate(intent, sourceName),
        mappingStatus: "inferred",
        confidence: /privacy|checkbox|continue|validation/i.test(intent) ? "medium" : "low",
        evidence: `Source ${sourceNode.nodeId}; Figma instance ${instance?.id ?? "Unknown"}; component ${instance?.componentId ?? "Unknown"}`,
        notes: "Candidate mapping only. Requires TaPaaS block catalogue confirmation."
      });
    }
  }
  return rows;
}

function buildFlowMap(designIr) {
  return {
    productionReady: false,
    requiresTaPaaSEngineeringReview: true,
    schemaCompatibilityClaim: "none",
    source: SOURCE,
    experiment: "02-controlled-multi-node",
    pageOrderSource: "Order of FIGMA_NODE_IDS when supplied, otherwise order returned by the local raw payload.",
    pages: designIr.pages.map((page, index) => ({
      order: index + 1,
      sourceNodeId: page.sourceNodeId,
      sourceName: page.sourceName,
      pageTitle: page.transactionIntent.pageTitle,
      role: page.role,
      mappingStatus: page.mappingStatus,
      ctas: page.ctas.map((cta) => ({
        label: cta.label,
        sourceNodeId: cta.sourceNodeId,
        likelyTargetPage: "Unknown",
        navigationStatus: "unknown",
        evidence: cta.navigationHint.evidence
      }))
    })),
    unknownTransitions: [
      "Cross-page navigation is Unknown unless explicit Figma prototype links are extracted and reviewed.",
      "Normal-to-error state relationships are inferred from validation text and frame naming only.",
      "Page order needs designer confirmation when selected nodes are not supplied in intended transaction order."
    ]
  };
}

function buildPseudoSchema(designIr) {
  return {
    _artefact: "engineering-review-pseudo-schema",
    _experiment: "02-controlled-multi-node",
    _status: "draft",
    _confidence: "medium-low",
    _needsTaPaaSEngineeringReview: true,
    _schemaCompatibilityClaim: "none",
    transaction: {
      _status: "inferred",
      _confidence: "low",
      _needsTaPaaSEngineeringReview: true,
      pages: designIr.pages.map((page) => ({
        _status: page.transactionIntent.status,
        _confidence: "medium-low",
        _needsTaPaaSEngineeringReview: true,
        id: page.id,
        title: page.transactionIntent.pageTitle,
        sourceNodeId: page.sourceNodeId,
        sections: page.sections.map((section) => ({
          _status: section.mappingStatus,
          _confidence: "medium-low",
          _needsTaPaaSEngineeringReview: true,
          id: section.id,
          sourceNodeId: section.sourceNodeId,
          blocks: section.blocks.map((block) => ({
            _status: block.mappingStatus,
            _confidence: "medium-low",
            _needsTaPaaSEngineeringReview: true,
            blockType: block.blockTypeCandidate,
            sourceNodeId: block.sourceNodeId,
            content: block.visualEvidence ?? [],
            fields: block.fields ?? [],
            validation: block.validation ?? [],
            requestMapping: {
              _status: "unknown",
              _confidence: "low",
              _needsTaPaaSEngineeringReview: true,
              placeholder: "Requires OpenAPI/Swagger or TaPaaS backend contract."
            },
            responseMapping: {
              _status: "unknown",
              _confidence: "low",
              _needsTaPaaSEngineeringReview: true,
              placeholder: "Requires OpenAPI/Swagger or TaPaaS backend contract."
            }
          })),
          ctas: page.ctas.map((cta) => ({
            _status: cta.mappingStatus,
            _confidence: cta.mappingStatus === "verified" ? "medium" : "low",
            _needsTaPaaSEngineeringReview: true,
            label: cta.label,
            sourceNodeId: cta.sourceNodeId,
            navigation: cta.navigationHint
          }))
        }))
      }))
    }
  };
}

function buildNodeComparison(evidence) {
  const nodes = asSourceNodes(evidence);
  const base = nodes[0];
  const baseText = base ? textSet(base) : new Set();
  const rows = nodes.map((node) => {
    const currentText = textSet(node);
    return {
      node,
      sharedWithFirst: [...currentText].filter((value) => baseText.has(value)).sort(),
      onlyInThisNode: difference(currentText, baseText),
      missingFromThisNode: difference(baseText, currentText)
    };
  });

  const validationRows = nodes.map((node) => `| ${node.sourceOrder} | \`${node.nodeId}\` | ${node.nodeName} | ${uniqueTextItems(likelyCtas(node)).map(textValue).join("<br>") || "Unknown"} | ${uniqueTextItems(likelyValidation(node)).map(textValue).join("<br>") || "None detected"} | ${pageRole(node)} |`).join("\n");
  const differenceSections = rows.map(({ node, sharedWithFirst, onlyInThisNode, missingFromThisNode }) => `### ${node.sourceOrder}. ${node.nodeName}

- Source node: \`${node.nodeId}\`
- Shared labels/content with first node: ${sharedWithFirst.length}
- Only in this node: ${onlyInThisNode.slice(0, 12).join("; ") || "None detected"}
- Missing from this node compared with first node: ${missingFromThisNode.slice(0, 12).join("; ") || "None detected"}
`).join("\n");

  const nodeCount = nodes.length;
  const summary = nodeCount > 1
    ? `This report compares ${nodeCount} locally available Figma nodes from the current raw payload. It highlights likely normal/acknowledgement and validation-error state differences for review.`
    : "This report compares the currently available local raw Figma node payload. Only one source node is available in this run, so cross-node differences remain unavailable.";

  return `# Experiment 2 Node Comparison

## Summary

${summary}

## CTA And Validation Comparison

| Order | Node ID | Node name | Likely CTAs | Likely validation/error evidence | Likely relationship |
|---|---|---|---|---|---|
${validationRows}

## Per-Node Differences

${differenceSections}
## Unknowns Requiring Confirmation

- Designer confirmation: whether selected nodes are normal states, error states or separate pages.
- Engineer confirmation: whether extracted labels map to TaPaaS blocks, fields, validation or shell content.
- Prototype confirmation: whether CTAs have explicit cross-page targets outside the selected raw evidence.
- Content confirmation: whether shared or differing text is approved wording or design draft content.
`;
}

function buildGapReport(designIr) {
  return `# Track 2 Gap Report

## Summary

Experiment 2 keeps the spike controlled: selected Figma nodes can be compared, normalised and converted into review artefacts, but this still does not prove TaPaaS schema compatibility, backend integration or approval readiness.

## Unknown From Figma Evidence

- Whether selected nodes are pages, component states or validation variants.
- Whether CTA targets are explicit page transitions or only component-state interactions.
- Whether frame order matches intended transaction order.
- Whether visible shell elements belong in generated schema or inherited app chrome.

## Unknown From Missing TaPaaS Schema Sample

- Real page, section, block, field, validation and CTA property names.
- Which candidate block types match existing TaPaaS blocks.
- Whether repeated content should be represented once, inherited, or repeated per page.

## Unknown From Missing OpenAPI/Swagger Spec

- Request fields for acknowledgement, consent or transaction progression.
- Response fields for validation, next-page routing or error recovery.
- Backend-owned error taxonomy and status handling.

## Unknown From Missing Content, Legal Or Privacy Owner Confirmation

- Approved privacy collection notice wording.
- Approved terms and conditions wording.
- Whether acknowledgement text must be stored, audited or displayed in a specific way.
- Whether content can be reused outside this private R&D spike.

## Top 10 Unknowns

| # | Unknown | Category | Needed from |
|---|---|---|---|
| 1 | Actual block type for privacy notice | Missing TaPaaS schema sample | Glen |
| 2 | Actual block type for acknowledgement checkbox | Missing TaPaaS schema sample | Glen |
| 3 | Validation model for terms acknowledgement | Missing TaPaaS schema sample | Glen |
| 4 | Continue target after valid acknowledgement | Figma evidence | Maddy or Michael |
| 5 | Whether selected nodes are normal/error states | Figma evidence | Maddy or Michael |
| 6 | Backend request mapping | Missing OpenAPI/Swagger spec | Glen or engineering |
| 7 | Backend response and error mapping | Missing OpenAPI/Swagger spec | Glen or engineering |
| 8 | Approved privacy and terms wording | Content/legal/privacy owner confirmation | Michael or owner |
| 9 | Whether shell content belongs in schema | Missing TaPaaS schema sample | Glen |
| 10 | Accessibility behaviour for error focus and checkbox association | Engineering/accessibility review | TaPaaS engineering |

## Recommended Next Experiment

Run a two-node fetch for the normal Privacy state and its validation-error state, then compare the generated node comparison report against Glen's minimal schema sample. Success means the spike can identify stable Design IR fields without inventing schema compatibility or backend behaviour.

## Evidence Snapshot

- Source node count: ${designIr.sourceEvidence.sourceNodeCount}
- Generated pages/states: ${designIr.pages.length}
- Production ready: false
- Schema compatibility claim: none
`;
}

function buildEngineeringQuestions() {
  return `# Engineering Review Questions

## For Glen

- Can you share the smallest real TaPaaS schema sample that includes pages, sections, blocks, validation and CTAs?
- Which candidate block types in \`03-component-map.csv\` line up with real TaPaaS block catalogue entries?
- Does TaPaaS schema model normal and error states separately, or as validation attached to fields/blocks?
- Where should request and response mappings sit for an acknowledgement field?

## For Maddy

- Which exact Figma node IDs should be used for the controlled two-node normal/error comparison?
- Are the selected nodes separate pages, component states or validation variants?
- Is the frame order in the selected nodes meaningful for transaction flow?
- Which visible labels are transaction content versus reusable shell content?

## For Michael

- Is this controlled multi-node comparison the right Track 2 next step?
- Who should confirm privacy, legal and terms content before any reuse?
- Should the next experiment prioritise schema mapping or a second page type?

## Review Boundary

This is a private R&D spike. It is not a production schema, not backend-connected, not accessibility-approved, not privacy-approved and not TaPaaS-approved.
`;
}

function buildTomorrowSummary(designIr) {
  return `# Track 2 Tomorrow Summary

## Plain English Summary

Experiment 2 extends Track 2 from one selected Figma node to a controlled multi-node path:

Figma REST API -> local raw JSON -> per-node normalised evidence -> Design IR -> pseudo schema, gap report and node comparison

This remains a private R&D spike. It is not production schema, not backend-connected, not approved and not a TaPaaS compatibility claim.

## What Is Now Supported

- \`FIGMA_NODE_IDS\` can be used for comma-separated multi-node fetches.
- \`FIGMA_NODE_ID\` still works for the original single-node path.
- Normalisation preserves per-source-node evidence: IDs, names, type, order, text, instances, likely fields, CTAs and validation evidence.
- The review pack now includes \`07-node-comparison.md\`.

## What Still Is Not Proven

- Actual TaPaaS schema compatibility.
- Backend request/response mapping.
- Production readiness or approval.
- Accessibility, legal, privacy, security, GEL or TaPaaS approval.
- Designer-confirmed state/page relationships.

## Specific Asks

| Person | Ask |
|---|---|
| Glen | Provide a minimal schema sample and confirm how normal/error states, validation and CTAs are represented. |
| Maddy | Provide the exact normal and error Figma node IDs to use for the controlled multi-node fetch. |
| Michael | Confirm whether this comparison is useful enough to take into a schema-mapping conversation. |

## Current Evidence

- Source node count: ${designIr.sourceEvidence.sourceNodeCount}
- Generated pages/states: ${designIr.pages.length}
- Production ready: false
- Schema compatibility claim: none
`;
}

function buildExperimentSummary(designIr) {
  return `# Experiment 2 Summary

## Purpose

Test whether Track 2 can handle a controlled set of selected Figma nodes without broadening into full transaction extraction.

## What Changed

- Added optional \`FIGMA_NODE_IDS\` support for comma-separated Figma node IDs.
- Kept backward compatibility with \`FIGMA_NODE_ID\`.
- Preserved per-source-node evidence in normalised output.
- Added node comparison output for normal/error or page/state comparisons.

## Current Run Boundary

This summary was generated from the existing local raw payload. No live Figma fetch was run by Codex for this increment.

## How To Run Multi-Node Fetch

\`\`\`zsh
cd /Users/leonardo.kesselring/Documents/Work/SNSW/Kiro/tapaas-kiro-trial
export FIGMA_FILE_KEY="pFDBhMVirBMo9JnJQbeI3I"
export FIGMA_NODE_IDS="490:60286,751:10322"
export FIGMA_TOKEN="$(pbpaste | tr -d '\\n\\r')"
node track-2-spike/scripts/run-pipeline.mjs --fetch
\`\`\`

## Review Boundary

Private R&D only. No production readiness, backend integration, real schema compatibility or approval claim.

## Current Evidence

- Source node count: ${designIr.sourceEvidence.sourceNodeCount}
- Generated pages/states: ${designIr.pages.length}
`;
}

export async function buildReviewPack({
  evidencePath = DEFAULT_EVIDENCE,
  outputDir = DEFAULT_OUTPUT_DIR,
  docDir = DEFAULT_DOC_DIR
} = {}) {
  const evidence = await readJson(evidencePath);
  const designIr = buildDesignIr(evidence);
  const componentRows = buildComponentMap(evidence);
  const flowMap = buildFlowMap(designIr);
  const pseudoSchema = buildPseudoSchema(designIr);

  await writeJson(`${outputDir}/02-design-ir.json`, designIr);
  await writeText(`${outputDir}/03-component-map.csv`, toCsv(componentRows, [
    "sourceNodeId",
    "sourceName",
    "sourceType",
    "componentIntent",
    "tapaasBlockTypeCandidate",
    "mappingStatus",
    "confidence",
    "evidence",
    "notes"
  ]));
  await writeJson(`${outputDir}/04-flow-map.json`, flowMap);
  await writeJson(`${outputDir}/05-schema-candidate.pseudo.json`, pseudoSchema);
  await writeText(`${outputDir}/06-gap-report.md`, buildGapReport(designIr));
  await writeText(`${outputDir}/07-node-comparison.md`, buildNodeComparison(evidence));
  await writeText(`${docDir}/engineering-review-questions.md`, buildEngineeringQuestions());
  await writeText(`${docDir}/experiment-02-summary.md`, buildExperimentSummary(designIr));
  await writeText(`${docDir}/tomorrow-summary.md`, buildTomorrowSummary(designIr));

  return {
    designIr: `${outputDir}/02-design-ir.json`,
    componentMap: `${outputDir}/03-component-map.csv`,
    flowMap: `${outputDir}/04-flow-map.json`,
    pseudoSchema: `${outputDir}/05-schema-candidate.pseudo.json`,
    gapReport: `${outputDir}/06-gap-report.md`,
    nodeComparison: `${outputDir}/07-node-comparison.md`,
    engineeringQuestions: `${docDir}/engineering-review-questions.md`,
    experimentSummary: `${docDir}/experiment-02-summary.md`,
    tomorrowSummary: `${docDir}/tomorrow-summary.md`
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  buildReviewPack()
    .then((result) => {
      console.log(`Built Track 2 review pack: ${Object.values(result).join(", ")}`);
    })
    .catch((error) => {
      console.error(error.message);
      process.exit(1);
    });
}
