

import { Locator, test, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class OrderStatusPage extends BasePage {

    private readonly orderNumberField: Locator
    private readonly guestAccessCodeField: Locator
    private readonly guestOrderEmailField: Locator
    private readonly btnSearchOrder: Locator

    constructor(page: Page) {
        super(page)
        this.orderNumberField = page.locator('div.order input[name="orderId"]')
        this.guestAccessCodeField = page.locator('div.order input[name="accessCode"]')
        this.guestOrderEmailField = page.locator('div.order input[name="email"]')
        this.btnSearchOrder = page.locator('button[type="submit"]').filter({ 'hasText': 'SEARCH' })
    }

    private async enterOrderNumber(orderID: string): Promise<void> {
        await test.step(`Entering details in OrderID EditBox`, async () => {
            await this.enterTextInEditBox(this.orderNumberField, orderID, { message: 'OrderID Edit Box' })
        })
    }

    private async enterGuestAccessCode(accessCode: string): Promise<void> {
        await test.step(`Entering details in Guest Access Code EditBox`, async () => {
            await this.enterTextInEditBox(this.guestAccessCodeField, accessCode, { message: 'Guest Access Code Edit Box' })
        })
    }

    private async enterGuestOrderEmail(emailID: string): Promise<void> {
        await test.step(`Entering details in Guest Email EditBox`, async () => {
            await this.enterTextInEditBox(this.guestOrderEmailField, emailID, { message: 'Guest Email Edit Box' })
        })
    }

    private async clickSearchButton(): Promise<void> {
        await test.step('Clicking the Search Button', async () => {
            await this.clickOn(this.btnSearchOrder, { message: 'Search Button' })
        })
    }

    public async searchGuestOrderDetails(orderID: string, accessCode: string, emailID: string): Promise<void> {
        await test.step(`Search Guest Order Details`, async () => {
            await this.enterOrderNumber(orderID)
            await this.enterGuestAccessCode(accessCode)
            await this.enterGuestOrderEmail(emailID)
            await this.clickSearchButton()
        })
    }
    
}