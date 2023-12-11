import { Locator, Page, test } from "@playwright/test";
import { BasePage } from "./basePage";

export class PaymentOptionsPage extends BasePage {

    private readonly elePaymentHeader: Locator
    private readonly contentDetails1: Locator
    private readonly contentDetails2: Locator


    constructor(page: Page) {
        super(page)
        this.elePaymentHeader = page.locator('div.content-ctn h2')
        this.contentDetails1 = page.locator('div.content-ctn.rte-field p').nth(0)
        this.contentDetails2 = page.locator('div.content-ctn.rte-field p').nth(1)
    }

    private async verifyPaymentHeader(): Promise<void> {
        await test.step(`Validate Payment Header Details`, async () => {
            await this.verifyElementVisibility(this.elePaymentHeader, { message: 'ACCEPTED METHODS OF PAYMENT' })
        })
    }

    private async verifyContentDetails1(): Promise<void> {
        await test.step(`Validate Payment Header Details`, async () => {
            await this.verifyElementVisibility(this.contentDetails1, { message: 'We accept Visa Content' })
            await this.verifyElementText(this.contentDetails1, 'We accept Visa', { message: 'We accept Visa' })
        })
    }

    private async verifyContentDetails2(): Promise<void> {
        await test.step(`Validate Payment Header Details`, async () => {
            await this.verifyElementVisibility(this.contentDetails2, { message: 'Our servers encrypt all information submitted Content' })
            await this.verifyElementText(this.contentDetails2, 'Our servers encrypt all information submitted to them, so you can be confident that your credit card information will be kept safe and secure.', { message: 'We accept Visa' })
        })
    }

    public async validateAllPaymentDetails(): Promise<void> {
        await test.step(`Validate All Payment Page Details`, async () => {
            await this.verifyPaymentHeader()
            await this.verifyContentDetails1()
            await this.verifyContentDetails2()
        })
    }
}