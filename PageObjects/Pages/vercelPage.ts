import { Locator, Page, test } from "@playwright/test";
import { BasePage } from "./basePage";

export class VercelPage extends BasePage {

    private readonly eleHeader: Locator

    constructor(page: Page) {
        super(page)
        this.eleHeader = page.locator('h2.heading5').filter({'hasText':'Quick Links with Images'})
    }

    public async verifyHeaderVisibility(): Promise<void> {
        await test.step('Verifying the Header Visibility', async () => {
            await this.verifyPageURL('/quick-links-comp')
            await this.verifyElementVisibility(this.eleHeader, { 'message': "Header Element" })
        })
    }
}