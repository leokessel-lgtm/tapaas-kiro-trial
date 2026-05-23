import { expect, test } from '@playwright/test'

async function continueFromCurrentStep(page: import('@playwright/test').Page) {
  await page.getByRole('button', { name: 'Continue' }).click()
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

test.describe('published preview app', () => {
  test('loads the app, exposes the expected visible transactions and avoids unsafe claims', async ({ page }) => {
    await page.goto('./')

    await expect(page.getByRole('heading', { name: 'Apply for a trial permit' })).toBeVisible()

    const switcher = page.getByRole('group', { name: 'Choose a trial transaction skeleton' })
    await expect(switcher.getByRole('button', { name: 'Vehicle skeleton' })).toBeVisible()
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

    await expect(page.getByText('Step 1 of 7: Start and privacy')).toBeVisible()
    await continueFromCurrentStep(page)
    await expect(page.getByRole('link', { name: 'Confirm that you have read the privacy information' })).toHaveAttribute('href', '#privacy-confirmation')

    await chooseByLabelText(page, 'I have read and understand the privacy information.')
    await continueFromCurrentStep(page)

    await chooseByLabelText(page, 'Signed in with verified account details (mock)')
    await chooseByLabelText(page, 'I understand proof of identity is not performed in this prototype.')
    await continueFromCurrentStep(page)

    await chooseByLabelText(page, 'Apply for a new permit (mock)')
    await continueFromCurrentStep(page)

    await page.getByLabel('Full name').fill('Alex Citizen')
    await page.getByLabel('Day').fill('15')
    await page.getByLabel('Month').fill('03')
    await page.getByLabel('Year').fill('1990')
    await page.getByLabel('Email address').fill('alex@example.test')
    await page.getByLabel('Phone number').fill('0400000000')
    await page.getByLabel('Street address').fill('1 Mock Street')
    await page.getByLabel('Suburb').fill('Sydney')
    await page.getByLabel('State').selectOption('NSW')
    await page.getByLabel('Postcode').fill('2000')
    await continueFromCurrentStep(page)

    await chooseByLabelText(page, 'No')
    await continueFromCurrentStep(page)

    await page.locator('label[for="has-mobility-condition-no"]').click()
    await page.locator('label[for="has-driver-licence-0"]').click()
    await page.locator('label[for="has-photo-card-0"]').click()
    await page.locator('label[for="needs-temporary-permit-1"]').click()
    await continueFromCurrentStep(page)

    await chooseByLabelText(page, 'Medical certificate (mock)')
    await chooseByLabelText(page, 'Mock uploaded now')
    await chooseByLabelText(page, 'I understand medical evidence handling is simulated only.')
    await continueFromCurrentStep(page)

    await page.getByLabel('Concession card option').selectOption('none')
    await continueFromCurrentStep(page)

    await chooseByLabelText(page, 'Post to residential address (mock)')
    await continueFromCurrentStep(page)

    await chooseByLabelText(page, 'Mock payment succeeds and application submits')
    await continueFromCurrentStep(page)

    await chooseByLabelText(page, 'I declare that the information provided is true and correct.')
    await continueFromCurrentStep(page)

    await expect(page.getByRole('heading', { name: 'Review your application' })).toBeVisible()
    await expect(page.getByText('Alex Citizen')).toBeVisible()
    await page.getByRole('button', { name: 'Submit mock application' }).click()

    await expect(page.getByRole('status', { name: 'Transaction completed' })).toBeVisible()
    await expect(page.getByText('MPS-MOCK-000000')).toBeVisible()
  })
})

test.describe('published Storybook', () => {
  test('loads the Storybook shell and key catalogues', async ({ page }) => {
    const indexResponse = await page.request.get('storybook/index.json')
    expect(indexResponse.ok()).toBe(true)

    const index = await indexResponse.json()
    expect(index.entries['gel-preview-form-controls--inputs-and-fields']).toBeTruthy()
    expect(index.entries['tapaas-preview-composites--review-and-confirmation']).toBeTruthy()
    expect(index.entries['tapaas-evidence-component-intake-board--intake-overview']).toBeTruthy()

    await page.goto('storybook/iframe.html?id=tapaas-evidence-component-intake-board--intake-overview&viewMode=story')
    await expect(page.getByRole('heading', { name: 'Component intake board' })).toBeVisible()
    await expect(page.getByRole('columnheader', { name: 'Candidate' })).toBeVisible()
    await expect(page.getByRole('columnheader', { name: 'Status' })).toBeVisible()
  })
})
