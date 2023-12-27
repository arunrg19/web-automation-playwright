import { expect, Locator, Page, test } from "@playwright/test";
import { BasePage } from "./basePage";
import { FooterComponent } from "../ui-components/footerComponent";

export class PLPPage extends BasePage {

    private readonly btnNotifyMeOOS: Locator
    private readonly btnNotifyMeCS: Locator
    private readonly notifyMePopUp: Locator
    private readonly txtNotifyMeEmail: Locator
    private readonly chkProductUpdates: Locator
    private readonly btnSubmit: Locator
    private readonly successMessage: Locator
    private readonly btnClose: Locator
    private readonly cartIcon: Locator
    private readonly cartIconClose: Locator
    private readonly btnATC: Locator
    private readonly eleDockedCart: Locator
    private readonly cartItems: Locator
    private readonly btnCheckout: Locator
    private readonly checkoutFrame: Locator
    private readonly btnDockedCartRemove: Locator
    private readonly dockedCartDetails: Locator
    private readonly btnDockedCartClose: Locator
    readonly footerComponent: FooterComponent

    constructor(page: Page) {
        super(page)
        this.btnNotifyMeOOS = page.locator('.small+.price-atc div.out-of-stock +a[aria-label*="Notify Me"]').nth(0)
        this.btnNotifyMeCS = page.locator('.small+.price-atc div.coming-soon +a[aria-label*="Notify Me"]').nth(0)
        this.notifyMePopUp = page.locator('h3.modal-title').filter({ 'hasText': 'NOTIFY ME' })
        this.txtNotifyMeEmail = page.locator('div.modal-default-view div.form-field input[name="emailId"]')
        this.chkProductUpdates = page.locator('div.notify-me-disclaimer input[name="subscriptionId"] +span')
        this.btnSubmit = page.locator('div.modal-default-view button[type="submit"]')
        this.successMessage = page.locator('div.modal-success-view')
        this.btnClose = page.locator('button.close-modal')
        this.btnATC = page.locator('.small+.price-atc:not([data-href*="test"]) a[aria-label*="Add To Cart"]').nth(0)
        this.eleDockedCart = page.locator('.pangea-docked-cart-drawer')
        this.cartItems = page.locator('ul.docked-cart-entries div.js-product-details')
        this.btnCheckout = page.locator('a.checkout-btn')
        this.cartIcon = page.locator('a[data-analytics-title="shopping-cart"]')
        this.cartIconClose = page.locator('.pangea-docked-cart-drawer button.btn').filter({ 'hasText': 'Close' })
        this.checkoutFrame = page.frameLocator('#logi-checkout').locator('section[aria-label="Summary"]')
        this.btnDockedCartRemove = page.locator('div.pangea-docked-cart-drawer button.btn.remove-btn')
        this.dockedCartDetails = page.locator('div.docked-cart-empty')
        this.btnDockedCartClose = page.locator('button[data-analytics-title="docked-cart-continue-shopping"]')
        this.footerComponent = new FooterComponent(this.page)
    }

    public async clickOutOfStockNotifyMe(): Promise<void> {
        await test.step('Clicking the Notify Me button for Out Of Stock Product', async () => {
            await this.clickOn(this.btnNotifyMeOOS, { message: 'Clicking the Notify Me button for Out Of Stock Product' })
            await this.verifyElementVisibility(this.notifyMePopUp, { message: 'Notify Me Pop-up' })
        })
    }

    public async clickComingSoonkNotifyMe(): Promise<void> {
        await test.step('Clicking the Notify Me button for Coming Soon Product', async () => {
            await this.clickOn(this.btnNotifyMeCS, { message: 'Clicking the Notify Me button for Coming Soon Product' })
            await this.verifyElementVisibility(this.notifyMePopUp, { message: 'Notify Me Pop-up' })
        })
    }

    public async clearCart(): Promise<void> {
        await this.clickOn(this.cartIcon, { message: 'Clicking the Cart Icon' })
        await this.page.waitForTimeout(2000)
        if (!await this.dockedCartDetails.isVisible()) {
            let count = await this.getElementsCount(this.btnDockedCartRemove)
            if (count > 0) {
                for (let i = 0; i < count; i++) {
                    await this.btnDockedCartRemove.first().click()
                }
            }
        }
        await expect(this.dockedCartDetails).toBeVisible()
        if(await this.btnDockedCartClose.isVisible()){
            await this.clickOn(this.btnDockedCartClose)
        }
    }

    public async clearingCart(): Promise<void> {
        await test.step('Clearing cart from PLP Page', async () => {
            await this.clearCart()
        })
    }

    public async clickAddToCart(cartItemsCount: number, itemQuantity: string): Promise<void> {
        await test.step('Clicking the ATC button for a non-test Product', async () => {
            await this.page.waitForTimeout(1000)
            await this.clearCart()
            await this.clickOn(this.cartIcon, { message: 'Clicking the Cart Icon before clicking ATC button' })
            await this.clickOn(this.cartIconClose, { message: 'Closing the Docked Cart before clicking ATC button' })
            await this.clickOn(this.btnATC, { message: 'Clicking the ATC button for a non-test Product' })
            await this.verifyElementVisibility(this.eleDockedCart, { message: 'Docked Cart' })
            await this.verifyElementCount(this.cartItems, cartItemsCount, { message: 'Items Count' })
            await this.verifyAttributeValue(this.cartItems, 'data-quantity', itemQuantity)
        })
    }

    public async clickCheckoutButton(): Promise<void> {
        await test.step('Clicking the Checkout Button', async () => {
            await this.verifyElementVisibility(this.btnCheckout, { message: "Checkout Button" })
            await this.clickOn(this.btnCheckout, { message: 'Clicking the Checkout Button' })
            await this.verifyElementVisibility(this.checkoutFrame, { message: "Checkout Page" })
        })
    }

    public async verifySubscriptionForOOS(emailID: string, loggedInUser: boolean): Promise<void> {
        await test.step('Verifying email subscription for Out Of Stock Product', async () => {
            await this.clickComingSoonkNotifyMe()
            await this.verifyEditboxValue(this.txtNotifyMeEmail, emailID, { message: 'Email ID Edit Box value validation' })
            if (loggedInUser === false) {
                let randomEmail: any = "testemail" + Math.floor((Math.random() * 10000) + 1) + "@logitech.com"
                await this.enterTextInEditBox(this.txtNotifyMeEmail, randomEmail, { message: 'Enter value in Email ID Edit Box' })
            }
            await this.checkBoxSelection(this.chkProductUpdates, 'check', { message: 'Receive updates checkbox' })
            await this.clickOn(this.btnSubmit, { message: 'Notify Me pop-up Submit Button' })
            await this.verifyElementVisibility(this.successMessage, { message: 'Success Message display after subscription' })
            await this.verifyElementText(this.successMessage, 'Thank you for signing up.')
            await this.clickOn(this.btnClose)
        })
    }

    public async verifySubscriptionForCS(emailID: string, loggedInUser: boolean): Promise<void> {
        await test.step('Verifying email subscription for Coming Soon Product', async () => {
            await this.clickComingSoonkNotifyMe()
            await this.verifyEditboxValue(this.txtNotifyMeEmail, emailID, { message: 'Email ID Edit Box value validation' })
            if (loggedInUser === false) {
                let randomEmail: any = "testemail" + Math.floor((Math.random() * 10000) + 1) + "@logitech.com"
                await this.enterTextInEditBox(this.txtNotifyMeEmail, randomEmail, { message: 'Enter value in Email ID Edit Box' })
            }
            await this.checkBoxSelection(this.chkProductUpdates, 'check', { message: 'Receive updates checkbox' })
            await this.clickOn(this.btnSubmit, { message: 'Notify Me pop-up Submit Button' })
            await this.verifyElementVisibility(this.successMessage, { message: 'Success Message display after subscription' })
            await this.verifyElementText(this.successMessage, 'Thank you for signing up.')
            await this.clickOn(this.btnClose)
        })
    }
}