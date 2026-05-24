import { readFileSync } from 'node:fs'
import { expect, test } from '@playwright/test'

interface AcceptanceStory {
  id: string
  mode?: string
  expectedText?: string
  mobileNoOverflow?: boolean
}

interface AcceptanceEntry {
  id: string
  name: string
  storybook: {
    required?: boolean
    stories?: AcceptanceStory[]
  }
}

interface AcceptanceManifest {
  entries: AcceptanceEntry[]
}

interface StoryTarget extends AcceptanceStory {
  entryIds: string[]
}

const manifest = JSON.parse(
  readFileSync('docs/tapaas/09-component-acceptance-manifest.json', 'utf8'),
) as AcceptanceManifest

const storyTargets = collectStoryTargets(manifest.entries)
const knownNonBlockingWarnings = [
  /ariaLabel.*PopoverProvider.*Storybook 11/i,
]

function collectStoryTargets(entries: AcceptanceEntry[]) {
  const targets = new Map<string, StoryTarget>()

  for (const entry of entries) {
    if (!entry.storybook?.required) continue

    for (const story of entry.storybook.stories ?? []) {
      const existing = targets.get(story.id)
      if (existing) {
        existing.entryIds.push(entry.id)
        existing.mobileNoOverflow ||= story.mobileNoOverflow
        existing.expectedText ||= story.expectedText
        continue
      }

      targets.set(story.id, {
        ...story,
        entryIds: [entry.id],
      })
    }
  }

  return Array.from(targets.values())
}

function isKnownNonBlockingWarning(message: string) {
  return knownNonBlockingWarnings.some((pattern) => pattern.test(message))
}

test.describe('component acceptance Storybook runtime smoke', () => {
  let storyIndex: Record<string, unknown>

  test.beforeAll(async ({ request }) => {
    const response = await request.get('storybook/index.json')
    expect(response.ok()).toBe(true)

    const body = await response.json()
    storyIndex = body.entries
  })

  for (const story of storyTargets) {
    test(`${story.id} renders for ${story.entryIds.join(', ')}`, async ({ page }) => {
      const blockingConsoleErrors: string[] = []
      const blockingPageErrors: string[] = []
      const allowedWarnings: string[] = []

      page.on('console', (message) => {
        const text = message.text()

        if (message.type() === 'warning' && isKnownNonBlockingWarning(text)) {
          allowedWarnings.push(text)
          return
        }

        if (message.type() === 'error') {
          blockingConsoleErrors.push(text)
        }
      })

      page.on('pageerror', (error) => {
        blockingPageErrors.push(error.message)
      })

      expect(storyIndex[story.id], `${story.id} should exist in Storybook index`).toBeTruthy()

      await page.goto(`storybook/iframe.html?id=${story.id}&viewMode=story`)
      await expect(page.locator('body')).toBeVisible()

      if (story.expectedText) {
        await expect(page.getByText(story.expectedText).first()).toBeVisible()
      }

      if (story.mobileNoOverflow) {
        await page.setViewportSize({ width: 390, height: 844 })
        const hasHorizontalOverflow = await page.evaluate(() => (
          document.documentElement.scrollWidth > document.documentElement.clientWidth
        ))

        expect(hasHorizontalOverflow).toBe(false)
      }

      expect(blockingPageErrors, 'blocking page errors').toEqual([])
      expect(blockingConsoleErrors, 'blocking console errors').toEqual([])

      test.info().annotations.push({
        type: 'allowedWarnings',
        description: String(allowedWarnings.length),
      })
    })
  }
})
