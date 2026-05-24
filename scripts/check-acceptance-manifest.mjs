import { existsSync, readFileSync } from 'node:fs'

const manifestPath = 'docs/tapaas/09-component-acceptance-manifest.json'
const evidenceLogPath = 'docs/tapaas/04-evidence-log.md'
const relationshipMapPath = 'docs/tapaas/05-component-template-relationship-map.md'
const coverageMatrixPath = 'docs/tapaas/08-transaction-coverage-matrix.md'

const requiredSections = [
  'id',
  'name',
  'classification',
  'maturity',
  'preview',
  'storybook',
  'transactionUsage',
  'tests',
  'evidence',
  'boundaries',
]

const allowedUsageDecisions = new Set([
  'used',
  'catalogue-only',
  'review-gated',
  'out-of-scope',
])

const unsafeClaimPatterns = [
  /\bproduction[- ]ready\b/i,
  /\bready for production\b/i,
  /\bwcag[- ]compliant\b/i,
  /\bwcag compliance\b/i,
  /\bgel[- ]approved\b/i,
  /\bgel approval\b/i,
  /\btapaas[- ]approved\b/i,
  /\btapaas approval\b/i,
  /\blegal[- ]approved\b/i,
  /\blegal approval\b/i,
  /\bprivacy[- ]approved\b/i,
  /\bprivacy approval\b/i,
  /\bpolicy[- ]approved\b/i,
  /\bpolicy approval\b/i,
  /\bpixel[- ]perfect\b/i,
  /\bpixel perfect parity\b/i,
]

function fail(message) {
  console.error(message)
  process.exitCode = 1
}

function readRequiredFile(path) {
  if (!existsSync(path)) {
    fail(`${path} does not exist`)
    return ''
  }

  return readFileSync(path, 'utf8')
}

function includesKey(fileText, filePath, key, label, entryId) {
  if (!key) return

  if (!fileText.includes(key)) {
    fail(`${entryId}: ${filePath} does not contain ${label} "${key}"`)
  }
}

function validateEntry(entry, index, evidenceLog, relationshipMap, coverageMatrix) {
  const entryId = entry?.id || `entry ${index + 1}`

  for (const section of requiredSections) {
    if (!(section in entry)) {
      fail(`${entryId}: missing required section "${section}"`)
    }
  }

  if (!entry.preview || typeof entry.preview !== 'object') {
    fail(`${entryId}: preview section must be an object`)
    return
  }

  if (!entry.preview.file || !entry.preview.export) {
    fail(`${entryId}: preview.file and preview.export are required`)
  }

  const previewText = readRequiredFile(entry.preview.file)
  const exportPattern = new RegExp(`export\\s+(function|const|class)\\s+${entry.preview.export}\\b`)
  if (previewText && !exportPattern.test(previewText)) {
    fail(`${entryId}: ${entry.preview.file} does not export ${entry.preview.export}`)
  }

  if (!entry.storybook || typeof entry.storybook !== 'object') {
    fail(`${entryId}: storybook section must be an object`)
  }

  if (!entry.transactionUsage || typeof entry.transactionUsage !== 'object') {
    fail(`${entryId}: transactionUsage section must be an object`)
  } else if (!allowedUsageDecisions.has(entry.transactionUsage.decision)) {
    fail(`${entryId}: transactionUsage.decision must be one of ${Array.from(allowedUsageDecisions).join(', ')}`)
  }

  for (const file of entry.transactionUsage?.files || []) {
    readRequiredFile(file)
  }

  if (!Array.isArray(entry.tests) || entry.tests.length === 0) {
    fail(`${entryId}: tests must list at least one test file`)
  } else {
    for (const testFile of entry.tests) {
      readRequiredFile(testFile)
    }
  }

  if (!entry.evidence || typeof entry.evidence !== 'object') {
    fail(`${entryId}: evidence section must be an object`)
  } else {
    const notes = entry.evidence.notes
    if (!Array.isArray(notes) || notes.length === 0) {
      fail(`${entryId}: evidence.notes must list at least one evidence note`)
    } else {
      for (const noteFile of notes) {
        readRequiredFile(noteFile)
      }
    }

    includesKey(evidenceLog, evidenceLogPath, entry.evidence.logKey, 'logKey', entryId)
    includesKey(relationshipMap, relationshipMapPath, entry.evidence.relationshipMapKey, 'relationshipMapKey', entryId)
    includesKey(coverageMatrix, coverageMatrixPath, entry.evidence.coverageMatrixKey, 'coverageMatrixKey', entryId)
  }

  if (!Array.isArray(entry.boundaries) || entry.boundaries.length === 0) {
    fail(`${entryId}: boundaries must list at least one implementation boundary`)
  }
}

const manifestText = readRequiredFile(manifestPath)

for (const pattern of unsafeClaimPatterns) {
  const match = manifestText.match(pattern)
  if (match) {
    fail(`${manifestPath} contains unsupported claim text: "${match[0]}"`)
  }
}

let manifest
try {
  manifest = JSON.parse(manifestText)
} catch (error) {
  fail(`${manifestPath} is not valid JSON: ${error.message}`)
}

if (manifest) {
  if (!Array.isArray(manifest.entries)) {
    fail(`${manifestPath} must contain an entries array`)
  } else {
    const evidenceLog = readRequiredFile(evidenceLogPath)
    const relationshipMap = readRequiredFile(relationshipMapPath)
    const coverageMatrix = readRequiredFile(coverageMatrixPath)

    for (const [index, entry] of manifest.entries.entries()) {
      validateEntry(entry, index, evidenceLog, relationshipMap, coverageMatrix)
    }

    if (!process.exitCode) {
      console.log(`Acceptance manifest checks passed for ${manifest.entries.length} entries`)
    }
  }
}
