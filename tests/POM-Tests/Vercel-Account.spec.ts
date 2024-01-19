import { expect, test } from '@playwright/test'
import { BasePage } from '../../PageObjects/Pages/basePage'
import { VercelPage } from '../../PageObjects/Pages/vercelPage'

test.describe("Vercel Header URL Launch", async () => {

    test(`Testing Vercel Header URL Launch`, async ({ page }) => {
        const appURL = "https://logi-web-author-qa.vercel.app/en-ca/test-data/quick-links/quick-links-comp"
        const basePage = new BasePage(page)
        const vercelPage = new VercelPage(page)
        await basePage.launchBrowserVercel(appURL, { 'message': "Launching the Vercel URL" })
        await vercelPage.verifyHeaderVisibility()
    })
})