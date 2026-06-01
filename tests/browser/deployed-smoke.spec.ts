import { expect, test } from '@playwright/test'

async function continueFromCurrentStep(page: import('@playwright/test').Page) {
  await page.getByRole('button', { name: /^(Continue|Next)$/ }).click()
}

async function chooseByLabelText(page: import('@playwright/test').Page, label: string | RegExp) {
  const radio = page.getByRole('radio', { name: label }).first()
  if (await radio.count()) {
    const id = await radio.getAttribute('id')
    if (id) {
      await page.locator(`label[for="${id}"]`).click()
    } else {
      await radio.check({ force: true })
    }
    return
  }

  await page.getByText(label, { exact: typeof label === 'string' }).click()
}

async function chooseOptionInGroup(page: import('@playwright/test').Page, groupName: string, optionName: string) {
  const radio = page.getByRole('group', { name: groupName }).getByRole('radio', { name: optionName })
  const id = await radio.getAttribute('id')

  if (id) {
    await page.locator(`label[for="${id}"]`).click()
  } else {
    await radio.check({ force: true })
  }
}

test.describe('published preview app', () => {
  test('loads the app, exposes the Clara-aligned visible transactions and avoids unsafe claims', async ({ page }) => {
    await page.goto('./')

    await expect(page.getByRole('heading', { name: 'Apply for a trial permit' })).toBeVisible()

    const switcher = page.getByRole('group', { name: 'Choose a trial transaction skeleton' })
    await expect(switcher.getByRole('button', { name: 'Vehicle skeleton' })).toHaveCount(0)
    await expect(switcher.getByRole('button', { name: 'Trial permit skeleton' })).toBeVisible()
    await expect(switcher.getByRole('button', { name: 'Accessible market permit' })).toBeVisible()
    await expect(switcher.getByRole('button', { name: 'Community venue booking' })).toBeVisible()
    await expect(switcher.getByRole('button', { name: 'Mobility Parking Scheme' })).toBeVisible()

    await expect(page.getByText(/WCAG compliant|production ready|GEL compliant|privacy approved|legal approved|policy approved/i)).toHaveCount(0)
  })

  test('has no horizontal overflow at mobile width', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('./')

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)
    expect(overflow).toBe(false)
  })

  test('completes a Mobility Parking Scheme happy-path smoke flow', async ({ page }) => {
    await page.goto('./')
    await page.getByRole('button', { name: 'Mobility Parking Scheme' }).click()

    await expect(page.getByRole('heading', { name: 'Mobility Parking Scheme permit' })).toBeVisible()
    await expect(page.getByRole('navigation', { name: 'Application progress' })).toContainText('Privacy')
    await expect(page.getByText(/Step \d+ of \d+/)).toHaveCount(0)
    await continueFromCurrentStep(page)
    await expect(page.getByRole('link', { name: 'Accept the Terms and Conditions to continue' })).toHaveAttribute('href', '#terms-and-conditions')

    await chooseByLabelText(page, 'I agree to the Terms and Conditions.')
    await continueFromCurrentStep(page)

    await chooseByLabelText(page, 'Apply for a new permit')
    await continueFromCurrentStep(page)

    await expect(page.getByRole('region', { name: 'Your profile details' })).toBeVisible()
    await expect(page.getByText('Alex Citizen')).toBeVisible()
    await expect(page.getByLabel(/First name/i)).toHaveCount(0)
    await expect(page.getByLabel(/Last name/i)).toHaveCount(0)
    await expect(page.getByLabel(/^Date of birth/i)).toHaveCount(0)
    await page.getByLabel('Contact phone number').fill('0400000000')
    await continueFromCurrentStep(page)

    await chooseOptionInGroup(page, 'Is someone applying on behalf of the applicant?', 'No')
    await continueFromCurrentStep(page)

    await chooseOptionInGroup(page, 'Does the applicant have a mobility condition?', 'Yes')
    await page.getByLabel('Describe the mobility condition').fill('Mobility support is required for walking longer distances.')
    await chooseOptionInGroup(page, 'Does the applicant have a NSW driver licence?', 'No')
    await chooseOptionInGroup(page, 'Does the applicant have a NSW photo card?', 'No')
    await chooseOptionInGroup(page, 'Is a temporary permit needed while this application is reviewed?', 'No')
    await continueFromCurrentStep(page)

    await chooseOptionInGroup(page, 'What medical evidence will be provided?', 'Medical certificate')
    await chooseOptionInGroup(page, 'How will the medical evidence be provided?', 'I have medical evidence ready')
    await chooseOptionInGroup(page, 'Does the applicant have a New South Wales concession card?', 'No')
    await continueFromCurrentStep(page)

    await expect(page.getByRole('heading', { name: 'Review your application' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Edit Application details' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Edit Your details' })).toBeVisible()
    await expect(page.getByText(/payment|fee|mock|prototype|figma|kiro/i)).toHaveCount(0)
    await chooseByLabelText(page, 'I declare that the information provided is true and correct.')
    await page.getByRole('button', { name: 'Submit application' }).click()

    await expect(page.getByRole('status', { name: 'Transaction completed' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Your application has been submitted for review' })).toBeVisible()
    await expect(page.getByText('MPS-000000')).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Keep a record' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'What happens next?' })).toBeVisible()
    await expect(page.getByText(/payment|fee|mock|prototype|figma|kiro/i)).toHaveCount(0)
  })
})

test.describe('published Storybook', () => {
  test('loads the Storybook shell and key catalogues', async ({ page }) => {
    const indexResponse = await page.request.get('storybook/index.json')
    expect(indexResponse.ok()).toBe(true)

    const index = await indexResponse.json()
    expect(index.entries['development-evidence-legacy-gel-preview-form-controls--inputs-and-fields']).toBeTruthy()
    expect(index.entries['tapaas-preview-composites--review-and-confirmation']).toBeTruthy()
    expect(index.entries['visual-qa-evidence-component-intake-board--intake-overview']).toBeTruthy()

    await page.goto('storybook/iframe.html?id=visual-qa-evidence-component-intake-board--intake-overview&viewMode=story')
    await expect(page.getByRole('heading', { name: 'Component intake board' })).toBeVisible()
    await expect(page.getByRole('columnheader', { name: 'Candidate' })).toBeVisible()
    await expect(page.getByRole('columnheader', { name: 'Status' })).toBeVisible()
  })
})
