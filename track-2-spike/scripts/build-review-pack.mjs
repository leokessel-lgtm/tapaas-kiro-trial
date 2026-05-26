import { fileURLToPath } from "node:url";
import { readJson, writeJson, writeText } from "./lib/fs.mjs";

const DEFAULT_EVIDENCE = "track-2-spike/outputs/normalised/extracted-evidence.json";
const DEFAULT_RAW = "track-2-spike/outputs/raw/figma-node-response.json";
const DEFAULT_OUTPUT_DIR = "track-2-spike/outputs";
const DEFAULT_DOC_DIR = "track-2-spike/docs";

const SOURCE = "figma-rest-api-private-rd-spike";
const REVIEW_PEOPLE = ["Glen", "Maddy", "Michael"];

function figmaNodeLink(fileKey, nodeId) {
  if (!fileKey || fileKey === "Unknown" || !nodeId || nodeId === "Unknown") {
    return null;
  }
  return `https://www.figma.com/file/${fileKey}?node-id=${encodeURIComponent(nodeId)}`;
}

function rawNodeId(raw, evidence) {
  const rawKey = Object.keys(raw.nodes ?? {})[0];
  return evidence.source.nodeId !== "Unknown" ? evidence.source.nodeId : rawKey ?? "Unknown";
}

function rawDocument(raw) {
  return Object.values(raw.nodes ?? {})[0]?.document;
}

function walk(node, visit, parent = null) {
  if (!node) {
    return;
  }

  visit(node, parent);
  for (const child of node.children ?? []) {
    walk(child, visit, node);
  }
}

function collectText(node) {
  const text = [];
  walk(node, (child) => {
    if (child.type === "TEXT" && typeof child.characters === "string") {
      text.push({
        nodeId: child.id,
        nodeName: child.name,
        value: child.characters.trim(),
        mappingStatus: "verified"
      });
    }
  });
  return text.filter((item) => item.value);
}

function textByPattern(text, pattern) {
  return text.find((item) => pattern.test(item.nodeName) || pattern.test(item.value));
}

function allTextByPattern(text, pattern) {
  return text.filter((item) => pattern.test(item.nodeName) || pattern.test(item.value));
}

function collectInstances(node) {
  const instances = [];
  walk(node, (child) => {
    if (child.type === "INSTANCE") {
      instances.push({
        sourceNodeId: child.id,
        sourceName: child.name,
        sourceType: child.type,
        componentId: child.componentId
      });
    }
  });
  return instances;
}

function collectInteractions(node) {
  const interactions = [];
  walk(node, (child) => {
    for (const interaction of child.interactions ?? []) {
      interactions.push({
        sourceNodeId: child.id,
        sourceName: child.name,
        sourceType: child.type,
        trigger: interaction.trigger?.type ?? "Unknown",
        actions: (interaction.actions ?? []).map((action) => ({
          type: action.type ?? "Unknown",
          destinationId: action.destinationId ?? null,
          navigation: action.navigation ?? null
        }))
      });
    }
  });
  return interactions;
}

function componentIntent(name) {
  const normalised = name.toLowerCase();
  if (normalised.includes("privacy")) return "privacy notice and consent step";
  if (normalised.includes("checkbox")) return "mandatory acknowledgement input";
  if (normalised.includes("continue")) return "primary continue CTA";
  if (normalised.includes("header")) return "service header";
  if (normalised.includes("footer")) return "service footer";
  if (normalised.includes("breadcrumb")) return "breadcrumb navigation";
  if (normalised.includes("step")) return "step indicator";
  if (normalised.includes("nav")) return "global navigation";
  if (normalised.includes("logo")) return "brand mark";
  if (normalised.includes("external")) return "external link icon";
  if (normalised.includes("validation")) return "validation message";
  return "supporting visual or layout component";
}

function blockTypeCandidate(intent, sourceName) {
  const text = `${intent} ${sourceName}`.toLowerCase();
  if (text.includes("privacy")) return "PrivacyNoticeCandidate";
  if (text.includes("checkbox") || text.includes("acknowledgement")) return "CheckboxFieldCandidate";
  if (text.includes("continue") || text.includes("cta")) return "ActionAreaCandidate";
  if (text.includes("validation")) return "ValidationMessageCandidate";
  if (text.includes("step")) return "ProgressStepCandidate";
  if (text.includes("header")) return "PageHeaderCandidate";
  if (text.includes("footer")) return "FooterCandidate";
  if (text.includes("breadcrumb")) return "BreadcrumbCandidate";
  return "LayoutOrContentCandidate";
}

function confidenceFor(status, intent) {
  if (status === "verified" && /privacy|checkbox|continue|validation/i.test(intent)) return "high";
  if (status === "verified") return "medium";
  if (status === "inferred") return "medium-low";
  return "low";
}

function evidenceFor(item) {
  return item.componentId ? `Figma instance ${item.sourceNodeId}; component ${item.componentId}` : `Figma node ${item.sourceNodeId}`;
}

function csvEscape(value) {
  const text = String(value ?? "");
  if (/[",\n]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

function toCsv(rows, columns) {
  return [
    columns.join(","),
    ...rows.map((row) => columns.map((column) => csvEscape(row[column])).join(","))
  ].join("\n") + "\n";
}

function frameRole(node) {
  if (/error/i.test(node.name)) return "validation-error-state";
  if (/privacy|consent|0\.1d/i.test(node.name)) return "privacy-page-state";
  return "supporting-frame";
}

function buildPages(rawRoot) {
  const pages = [];
  const candidateFrames = [];

  for (const child of rawRoot.children ?? []) {
    if (child.type === "FRAME") {
      candidateFrames.push(child);
    }
    if (child.type === "SECTION") {
      for (const nested of child.children ?? []) {
        if (nested.type === "FRAME") {
          candidateFrames.push(nested);
        }
      }
    }
  }

  for (const [index, frame] of candidateFrames.entries()) {
    const text = collectText(frame);
    const title = textByPattern(text, /Page title|Privacy$/i);
    const transactionName = textByPattern(text, /Page label|transaction name|Submit a notice/i);
    const stepName = textByPattern(text, /Step name|Privacy/i);
    const privacyHeading = textByPattern(text, /Privacy collection notice/i);
    const continueLabel = textByPattern(text, /^Continue$/i);
    const checkboxLabel = textByPattern(text, /I accept the terms and conditions/i);
    const validationText = textByPattern(text, /Accept the Terms and conditions to continue/i);
    const emailText = textByPattern(text, /send you an email/i);
    const interactions = collectInteractions(frame);

    pages.push({
      id: `page-${index + 1}`,
      sourceNodeId: frame.id,
      sourceName: frame.name,
      sourceType: frame.type,
      order: index + 1,
      role: frameRole(frame),
      mappingStatus: /privacy|consent|error|0\.1d|2\.4/i.test(frame.name) ? "verified" : "inferred",
      visualEvidence: {
        frameName: frame.name,
        nodeType: frame.type,
        childCount: frame.children?.length ?? 0,
        textNodeCount: text.length,
        instanceCount: collectInstances(frame).length,
        interactions
      },
      transactionIntent: {
        status: /privacy|consent|error|0\.1d|2\.4/i.test(frame.name) ? "inferred" : "unknown",
        name: transactionName?.value ?? "Unknown",
        pageTitle: title?.value ?? "Unknown",
        stepName: stepName?.value ?? "Unknown",
        purpose: validationText
          ? "Show the privacy step after mandatory terms acknowledgement validation fails."
          : "Collect acknowledgement of privacy and terms information before continuing."
      },
      sections: [
        {
          id: `page-${index + 1}-section-main`,
          sourceNodeId: privacyHeading?.nodeId ?? frame.id,
          sourceName: privacyHeading?.nodeName ?? frame.name,
          sourceType: privacyHeading ? "TEXT" : frame.type,
          mappingStatus: privacyHeading ? "verified" : "inferred",
          intent: "privacy notice content",
          blocks: [
            {
              id: `page-${index + 1}-block-privacy-notice`,
              blockTypeCandidate: "PrivacyNoticeCandidate",
              sourceNodeId: privacyHeading?.nodeId ?? frame.id,
              sourceName: privacyHeading?.nodeName ?? "Privacy notice area",
              mappingStatus: privacyHeading ? "verified" : "inferred",
              visualEvidence: text.filter((item) => /Privacy collection notice|personal information|Privacy Collection notice/i.test(item.value)),
              transactionIntent: "Display privacy collection notice and related content before form continuation."
            },
            {
              id: `page-${index + 1}-block-consent-checkbox`,
              blockTypeCandidate: "CheckboxFieldCandidate",
              sourceNodeId: checkboxLabel?.nodeId ?? frame.id,
              sourceName: checkboxLabel?.nodeName ?? "Terms acknowledgement checkbox",
              mappingStatus: checkboxLabel ? "verified" : "unknown",
              fields: [
                {
                  id: `page-${index + 1}-field-terms-acknowledgement`,
                  sourceNodeId: checkboxLabel?.nodeId ?? null,
                  sourceName: checkboxLabel?.nodeName ?? "Unknown",
                  label: checkboxLabel?.value ?? "Unknown",
                  inputTypeCandidate: "checkbox",
                  required: "inferred",
                  validation: validationText
                    ? {
                        message: validationText.value,
                        sourceNodeId: validationText.nodeId,
                        mappingStatus: "verified"
                      }
                    : {
                        message: "Unknown",
                        sourceNodeId: null,
                        mappingStatus: "unknown"
                      },
                  mappingStatus: checkboxLabel ? "verified" : "unknown"
                }
              ]
            },
            {
              id: `page-${index + 1}-block-notification-text`,
              blockTypeCandidate: "ContentTextCandidate",
              sourceNodeId: emailText?.nodeId ?? null,
              sourceName: emailText?.nodeName ?? "Unknown",
              mappingStatus: emailText ? "verified" : "unknown",
              textContent: emailText ? [emailText] : []
            }
          ]
        }
      ],
      ctas: [
        {
          id: `page-${index + 1}-cta-continue`,
          label: continueLabel?.value ?? "Unknown",
          sourceNodeId: continueLabel?.nodeId ?? null,
          sourceName: continueLabel?.nodeName ?? "Unknown",
          mappingStatus: continueLabel ? "verified" : "unknown",
          navigationHint: {
            targetPage: validationText ? "same page after correcting acknowledgement" : "next transaction step",
            status: "inferred",
            evidence: interactions.length
              ? "Raw Figma interactions show component variant hover/change-to behaviour only, not explicit page-to-page prototype navigation."
              : "No explicit prototype navigation captured in raw evidence."
          }
        }
      ],
      textContent: text
    });
  }

  return pages;
}

function buildComponentMap(rawRoot) {
  const rows = [];
  const seen = new Set();
  for (const instance of collectInstances(rawRoot)) {
    const intent = componentIntent(instance.sourceName);
    const mappingStatus = /privacy|checkbox|continue|validation|header|footer|breadcrumb|step/i.test(`${instance.sourceName} ${intent}`)
      ? "inferred"
      : "unknown";
    const key = `${instance.sourceNodeId}-${instance.sourceName}`;
    if (seen.has(key)) continue;
    seen.add(key);
    rows.push({
      sourceNodeId: instance.sourceNodeId,
      sourceName: instance.sourceName,
      sourceType: instance.sourceType,
      componentIntent: intent,
      tapaasBlockTypeCandidate: blockTypeCandidate(intent, instance.sourceName),
      mappingStatus,
      confidence: confidenceFor(mappingStatus, intent),
      evidence: evidenceFor(instance),
      notes: "Candidate mapping only. Requires TaPaaS block catalogue confirmation."
    });
  }
  return rows;
}

function buildFlowMap(designIr) {
  const pages = designIr.pages.map((page, index) => ({
    order: page.order,
    sourceNodeId: page.sourceNodeId,
    sourceName: page.sourceName,
    pageTitle: page.transactionIntent.pageTitle,
    role: page.role,
    mappingStatus: page.mappingStatus,
    ctas: page.ctas.map((cta) => ({
      label: cta.label,
      sourceNodeId: cta.sourceNodeId,
      likelyTargetPage: index < designIr.pages.length - 1 ? designIr.pages[index + 1].sourceName : cta.navigationHint.targetPage,
      navigationStatus: "inferred",
      evidence: cta.navigationHint.evidence
    }))
  }));

  return {
    productionReady: false,
    requiresTaPaaSEngineeringReview: true,
    schemaCompatibilityClaim: "none",
    source: SOURCE,
    pageOrderSource: "Figma child order inside selected section",
    pages,
    unknownTransitions: [
      "No explicit page-to-page Figma prototype links were captured for Continue.",
      "The target page after a valid Privacy acknowledgement is not known from this selected node alone.",
      "The relationship between normal state and validation-error state is inferred from frame names and validation text."
    ]
  };
}

function buildDesignIr(evidence, raw) {
  const root = rawDocument(raw);
  const nodeId = rawNodeId(raw, evidence);
  const fileKey = evidence.source.fileKey;
  const sourceLink = figmaNodeLink(fileKey, nodeId);
  const pages = buildPages(root);
  return {
    productionReady: false,
    requiresTaPaaSEngineeringReview: true,
    schemaCompatibilityClaim: "none",
    source: SOURCE,
    generatedAt: new Date().toISOString(),
    audience: REVIEW_PEOPLE,
    sourceEvidence: {
      fileKey,
      nodeId,
      sourceLink,
      rawPath: evidence.source.rawPath,
      normalisedPath: DEFAULT_EVIDENCE,
      selectedNodeName: evidence.summary.nodeName,
      selectedNodeType: evidence.summary.nodeType,
      descendantCount: evidence.summary.descendantCount
    },
    boundaries: {
      visualEvidence: "Figma node hierarchy, text nodes, instances and captured component interactions.",
      transactionIntent: "Inferred only where page/frame names, visible labels or validation text support a transaction interpretation.",
      blockTypes: "All TaPaaS block types are candidates until confirmed against Glen's schema sample and the TaPaaS block catalogue."
    },
    pages,
    unknowns: [
      "Actual TaPaaS page, section and block schema names are Unknown.",
      "Actual backend request/response fields are Unknown.",
      "Actual Continue target after a valid privacy acknowledgement is Unknown.",
      "Whether the Privacy card maps to an existing TaPaaS block or a composition is Unknown.",
      "Content ownership and approved privacy/legal wording are Unknown."
    ]
  };
}

function buildPseudoSchema(designIr) {
  return {
    _artefact: "engineering-review-pseudo-schema",
    _status: "draft",
    _confidence: "medium-low",
    _needsTaPaaSEngineeringReview: true,
    _schemaCompatibilityClaim: "none",
    _notes: "This mirrors a conceptual TaPaaS page/section/block shape only. It does not claim actual TaPaaS schema compatibility.",
    transaction: {
      _status: "inferred",
      _confidence: "medium",
      _needsTaPaaSEngineeringReview: true,
      name: designIr.pages[0]?.transactionIntent.name ?? "Unknown",
      source: designIr.sourceEvidence,
      pages: designIr.pages.map((page) => ({
        _status: page.transactionIntent.status,
        _confidence: page.mappingStatus === "verified" ? "medium" : "low",
        _needsTaPaaSEngineeringReview: true,
        id: page.id,
        title: page.transactionIntent.pageTitle,
        sourceNodeId: page.sourceNodeId,
        sections: page.sections.map((section) => ({
          _status: section.mappingStatus,
          _confidence: section.mappingStatus === "verified" ? "medium" : "low",
          _needsTaPaaSEngineeringReview: true,
          id: section.id,
          sourceNodeId: section.sourceNodeId,
          blocks: section.blocks.map((block) => ({
            _status: block.mappingStatus,
            _confidence: block.mappingStatus === "verified" ? "medium" : "low",
            _needsTaPaaSEngineeringReview: true,
            id: block.id,
            blockType: block.blockTypeCandidate,
            sourceNodeId: block.sourceNodeId,
            content: block.textContent ?? block.visualEvidence ?? [],
            validation: block.fields?.[0]?.validation ?? {
              _status: "unknown",
              _confidence: "low",
              _needsTaPaaSEngineeringReview: true
            },
            fields: block.fields ?? [],
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

function buildGapReport(designIr) {
  const firstPage = designIr.pages[0];
  return `# Track 2 Gap Report

## Summary

The selected Figma evidence is useful for identifying a Privacy step, a mandatory terms acknowledgement, a Continue action and a validation-error state. It is not enough to claim a TaPaaS-compatible schema, production readiness, backend integration or approved privacy/legal content.

## What Cannot Be Known From Figma Alone

- Whether each visual pattern maps to an existing TaPaaS schema block, a new block, or a composition of existing blocks.
- The exact TaPaaS page, section, block, CTA and validation schema names.
- Backend request and response payloads.
- Whether the Terms and Conditions acknowledgement is stored, audited or sent to a backend.
- The real target page after Continue.
- Approved privacy collection notice, privacy statement and terms wording.
- Error handling beyond the visible front-end validation example.
- Accessibility behaviour in assistive technologies.

## Top 10 Unknowns

| # | Unknown | Why it matters | Needs |
|---|---|---|---|
| 1 | Actual TaPaaS block type for the privacy notice | Determines whether this can be generated from existing blocks | Glen's schema sample and TaPaaS block catalogue |
| 2 | Actual block type for the acknowledgement checkbox | Determines form field modelling and validation | Glen's schema sample and TaPaaS block catalogue |
| 3 | Validation schema for mandatory acknowledgement | Figma shows message text but not runtime validation structure | Glen's schema sample |
| 4 | Continue target after successful acknowledgement | Flow cannot be proven from the selected node | Designer frame naming confirmation and prototype links |
| 5 | Backend request field for acknowledgement | Required before any API-connected implementation | OpenAPI/Swagger spec |
| 6 | Backend response after Continue | Required for navigation, errors and state transitions | OpenAPI/Swagger spec |
| 7 | Approved privacy and terms wording | Figma text may be draft or copied content | Content owner confirmation |
| 8 | Whether header/footer/global nav are part of TaPaaS schema | Affects what should be generated versus inherited from shell | TaPaaS block catalogue |
| 9 | Whether validation-error frame naming is canonical | Affects repeatable extraction from future pages | Designer frame naming confirmation |
| 10 | Accessibility expectations for error focus and checkbox association | Figma visual evidence does not prove assistive-technology behaviour | TaPaaS engineering and accessibility review |

## Inputs Needed

| Input | Needed from | Use |
|---|---|---|
| Schema sample | Glen | Compare Design IR to real page/section/block structure |
| TaPaaS block catalogue | Glen or TaPaaS engineering | Replace candidate block types with real block types |
| OpenAPI/Swagger spec | Glen or engineering | Add request/response mapping placeholders with real field names |
| Frame naming confirmation | Michael or Maddy | Confirm page order, state naming and normal/error frame relationships |
| Content owner confirmation | Michael, Maddy or nominated owner | Confirm privacy, terms and notification wording |

## Recommended Next Experiment

Use Glen's smallest real schema sample for one simple page and map this Privacy Design IR into it without building UI. The success test should be narrow: can we convert Figma evidence into a valid draft schema shape with all unsupported fields marked Unknown, without inventing backend or policy behaviour?

## Evidence Snapshot

- Selected node: ${designIr.sourceEvidence.selectedNodeName} (${designIr.sourceEvidence.selectedNodeType})
- First inferred page: ${firstPage?.sourceName ?? "Unknown"}
- Generated pages: ${designIr.pages.length}
- Production ready: false
- Schema compatibility claim: none
`;
}

function buildEngineeringQuestions() {
  return `# Engineering Review Questions

## For Glen

- Can you share the smallest real TaPaaS schema sample that includes pages, sections, blocks, validation and CTAs?
- What are the allowed block type names for privacy notices, checkbox acknowledgements, validation messages and action areas?
- Does the schema represent shell elements such as header, footer and global navigation, or are those outside page schema?
- How should request and response mappings be represented for a form acknowledgement?
- Are validation messages modelled inside fields, blocks, pages or a separate error-summary structure?

## For Maddy

- Is this Privacy frame the right source for the Notice of Disposal transaction spike?
- Are the normal and validation-error frames named in a way that can be reused as a repeatable extraction convention?
- Which visible elements are transaction content versus reusable shell/navigation?
- Is the Continue destination known from nearby frames or prototype links outside this selected node?
- Which parts should remain design evidence only until content or engineering review?

## For Michael

- Is the privacy notice pattern a TaPaaS-owned pattern, a GEL-aligned composition or still unresolved?
- Is the wording in this Figma frame owner-approved, draft or placeholder?
- Should Track 2 focus next on schema translation, block catalogue mapping or a second selected page?
- What level of evidence would make this useful for TaPaaS planning without implying production readiness?
- Who should confirm privacy/legal wording before any preview or schema work uses it as source content?

## Review Boundary

This is a private R&D spike. It is not a production schema, not backend-connected, not accessibility-approved and not TaPaaS-approved.
`;
}

function buildTomorrowSummary(designIr) {
  return `# Track 2 Tomorrow Summary

## Plain English Summary

Track 2 now proves that we can take one selected Figma node through a local evidence pipeline:

Figma REST API -> local raw JSON -> normalised evidence -> Design IR -> pseudo schema/gap report

The output is useful as a review pack for discussing how Figma evidence might become TaPaaS schema input. It is still a private R&D spike, not a production schema, not backend-connected and not approved.

## What Was Proven

- The Figma REST API can fetch the selected Privacy node into local raw JSON.
- The pipeline can reuse the local raw payload without another live fetch.
- The normalised evidence can be converted into a Design IR with pages, sections, blocks, fields, CTAs, text and navigation hints.
- The spike can produce a pseudo schema and gap report for engineering review.
- The artefacts preserve node IDs, names and mapping status rather than pretending everything is certain.

## What Was Not Proven

- No actual TaPaaS schema compatibility has been proven.
- No backend request or response mapping has been proven.
- No production readiness, accessibility compliance, GEL approval or TaPaaS approval has been proven.
- The Continue target is inferred, not confirmed by explicit prototype navigation.
- Privacy and terms wording still need owner confirmation.

## Specific Asks

| Person | Ask |
|---|---|
| Glen | Share a minimal real TaPaaS schema sample and block catalogue entries for privacy notice, checkbox, validation and CTAs. |
| Maddy | Confirm whether the selected Privacy frames and normal/error naming are the right source pattern for this spike. |
| Michael | Confirm whether this is the right pattern to test next and who should approve the privacy/terms content before reuse. |

## Current Evidence

- Selected node: ${designIr.sourceEvidence.selectedNodeName}
- Node type: ${designIr.sourceEvidence.selectedNodeType}
- Generated Design IR pages: ${designIr.pages.length}
- Production ready: false
- Schema compatibility claim: none
`;
}

export async function buildReviewPack({
  evidencePath = DEFAULT_EVIDENCE,
  rawPath = DEFAULT_RAW,
  outputDir = DEFAULT_OUTPUT_DIR,
  docDir = DEFAULT_DOC_DIR
} = {}) {
  const evidence = await readJson(evidencePath);
  const raw = await readJson(rawPath);
  const root = rawDocument(raw);

  if (!root) {
    throw new Error(`No raw Figma document found in ${rawPath}`);
  }

  const designIr = buildDesignIr(evidence, raw);
  const componentRows = buildComponentMap(root);
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
  await writeText(`${docDir}/engineering-review-questions.md`, buildEngineeringQuestions());
  await writeText(`${docDir}/tomorrow-summary.md`, buildTomorrowSummary(designIr));

  return {
    designIr: `${outputDir}/02-design-ir.json`,
    componentMap: `${outputDir}/03-component-map.csv`,
    flowMap: `${outputDir}/04-flow-map.json`,
    pseudoSchema: `${outputDir}/05-schema-candidate.pseudo.json`,
    gapReport: `${outputDir}/06-gap-report.md`,
    engineeringQuestions: `${docDir}/engineering-review-questions.md`,
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
