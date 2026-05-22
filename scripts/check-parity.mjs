import { readFileSync } from 'node:fs'

const evidenceLog = 'docs/tapaas/04-evidence-log.md'
const evidenceMirror = 'docs/source-evidence/tapaas-design-library/04-evidence-log.md'
const storybookConfig = '.storybook/main.ts'

function fail(message) {
  console.error(message)
  process.exitCode = 1
}

const log = readFileSync(evidenceLog, 'utf8')
const mirror = readFileSync(evidenceMirror, 'utf8')

if (log !== mirror) {
  fail(`${evidenceLog} and ${evidenceMirror} are not identical`)
}

for (const [index, line] of log.split('\n').entries()) {
  if (!line.startsWith('| 202')) continue
  const fieldCount = line.split('|').length
  if (fieldCount !== 11) {
    fail(`${evidenceLog}:${index + 1} has ${fieldCount} pipe-delimited fields, expected 11`)
  }
}

const config = readFileSync(storybookConfig, 'utf8')
if (!config.includes('../src/**/*.stories.@(ts|tsx)')) {
  fail(`${storybookConfig} does not include src Storybook stories`)
}

if (!process.exitCode) {
  console.log('Parity checks passed')
}
