import { expect, test } from '@playwright/test'

test.describe("Vercel Header", async () => {

    test(`Testing`, async ({ page, browser }) => {
        const headers = {
            "x-vercel-protection-bypass": "knD5cLIY7JOOoBiek6zjfouplKs1dHUU"
        };

        const context = await browser.newContext({ extraHTTPHeaders: headers })
        page = await context.newPage();

        page.goto('https://logi-web-publish-qa.vercel.app/en-ca/test-data/category-card/category-card')

        await expect(page.locator('button[data-analytics-title="cookie-consent"]')).toBeVisible()
    })
})