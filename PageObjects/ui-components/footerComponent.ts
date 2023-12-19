import { Locator, Page, test } from "@playwright/test";
import { BasePage } from "../Pages/basePage";

export class FooterComponent extends BasePage {

    readonly footerElement: Locator
    readonly copyrightElement: Locator
    readonly footerEmail: Locator
    readonly btnSubscribe: Locator
    readonly subscribeCheckBox: Locator
    readonly successMessage: Locator

    constructor(page: Page) {
        super(page)
        this.footerElement = page.locator('footer[data-analytics-section="footer"]')
        this.copyrightElement = page.locator('div[class^="copyright"]').nth(0)
        this.footerEmail = page.locator('footer[data-analytics-section="footer"] input[type="email"]')
        this.subscribeCheckBox = page.locator('footer[data-analytics-section="footer"] .checkmark-label')
        this.btnSubscribe = page.locator('footer[data-analytics-section="footer"] button[name="email-subscription-submit"]')
        this.successMessage = page.locator('.email-subscription-success')
    }

    public async validateFooterComponent(): Promise<void> {
        await test.step('Validate Footer component Details', async () => {
            await this.verifyElementVisibility(this.footerElement, {message:'Footer'})
            await this.scrollToElement(this.copyrightElement, {message:'Copyright'})
            await this.verifyElementVisibility(this.copyrightElement, {message:'Copyright'})
            await this.verifyElementVisibility(this.footerEmail, {message:'Footer Email'})
            await this.verifyElementVisibility(this.btnSubscribe, {message:'Subscribe Button'})
        })
    }

    public async validateFooterEmailSubscription(): Promise<void> {
        await test.step('Validate Footer Email Subscription Details', async () => {
            let randomEmail: any = "testemail" + Math.floor((Math.random() * 10000) + 1) + "@logitech.com"
            await this.enterTextInEditBox(this.footerEmail, randomEmail, {message:'Footer Subscription Email Edit Box'})
            await this.clickOn(this.subscribeCheckBox, {message:'Footer Email Subscribe Checkbox'})
            await this.clickOn(this.btnSubscribe, {message:'Subscribe Button'})
            await this.verifyElementVisibility(this.successMessage, {message:'Email Subscription Sucesss Message'})
        })
    }
}