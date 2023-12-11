import { Locator, Page, test } from "@playwright/test";
import { BasePage } from "./basePage";

const iframeName: string = '#logi-checkout'
var orderNumber: string = ""

export class CheckoutPage extends BasePage {

    public static orderID: string
    private readonly txtCheckoutEmail: Locator
    private readonly txtCheckoutFirstName: Locator
    private readonly txtCheckoutLastName: Locator
    private readonly txtCheckoutAddressLine1: Locator
    private readonly txtCheckoutPhoneNumber: Locator
    private readonly btnCheckoutSubmit: Locator
    private readonly checkoutAddressItem: Locator
    private readonly checkoutShippingForm: Locator
    private readonly btnShippingSubmit: Locator
    private readonly txtCreditCardForm: Locator
    private readonly txtCardNumber: Locator
    private readonly txtExpiryDate: Locator
    private readonly txtCvv: Locator
    private readonly btnPaymentSubmit: Locator
    private readonly btnContinueShopping: Locator
    private readonly orderSuccessMessage: Locator
    private readonly orderNumberField: Locator
    private readonly linkCreateAnAccount: Locator

    constructor(page: Page) {
        super(page)
        this.txtCheckoutEmail = page.frameLocator(iframeName).locator('input[name="email"]')
        this.txtCheckoutFirstName = page.frameLocator(iframeName).locator('input[name*="first_name"]')
        this.txtCheckoutLastName = page.frameLocator(iframeName).locator('input[name*="last_name"]')
        this.txtCheckoutAddressLine1 = page.frameLocator(iframeName).locator('input[name*="address1"]')
        this.txtCheckoutPhoneNumber = page.frameLocator(iframeName).locator('input[name*="phone"]')
        this.btnCheckoutSubmit = page.frameLocator(iframeName).locator('button[type="submit"]')
        this.checkoutAddressItem = page.frameLocator(iframeName).locator('div.pcaselected').nth(0)
        this.checkoutShippingForm = page.frameLocator(iframeName).locator('div#shipping-form')
        this.btnShippingSubmit = page.frameLocator(iframeName).locator('button[type="submit"]').filter({ 'hasText': 'Save and continue' })
        this.txtCreditCardForm = page.frameLocator(iframeName).locator('div[id^="creditCard-controller"]')
        const parentFrame = page.frameLocator(iframeName)
        this.txtCardNumber = parentFrame.frameLocator('iframe[id^="cardnumber"]').locator('#ccNumber')
        this.txtExpiryDate = parentFrame.frameLocator('iframe[id^="cardexpiration"]').locator('#ccExpiry')
        this.txtCvv = parentFrame.frameLocator('iframe[id^="cardcvv"]').locator('#ccCVV')
        this.btnPaymentSubmit = page.frameLocator(iframeName).locator('button[type="submit"]').filter({ 'hasText': 'Submit Order' }).nth(0)
        this.btnContinueShopping = page.frameLocator(iframeName).locator('a.relative').filter({ 'hasText': 'Continue Shopping' })
        this.orderSuccessMessage = page.frameLocator(iframeName).locator('main.relative div[class^="max-w-"]').nth(0)
        this.orderNumberField = page.frameLocator(iframeName).locator('main.relative div[class^="max-w-"] div.text-body-14 strong').nth(0)
        this.linkCreateAnAccount = page.frameLocator(iframeName).locator('a').filter({ 'hasText': 'Create Account' })
    }

    private async enterEmail(email: string): Promise<void> {
        await test.step('Entering details in the EmailID EditBox', async () => {
            await this.enterTextInEditBox(this.txtCheckoutEmail, email, { message: 'EmailID Edit Box' });
        })
    }

    private async enterFirstName(fName: string): Promise<void> {
        await test.step('Entering details in the First Name EditBox', async () => {
            await this.enterTextInEditBox(this.txtCheckoutFirstName, fName, { message: 'First Name Edit Box' })
        })
    }

    private async enterLastName(lName: string): Promise<void> {
        await test.step('Entering details in the Last Name EditBox', async () => {
            await this.enterTextInEditBox(this.txtCheckoutLastName, lName, { message: 'Last Name Edit Box' })
        })
    }

    private async enterAddress(addressLine1: string): Promise<void> {
        await test.step('Entering details in the Address Line1 EditBox', async () => {
            await this.enterTextInEditBox(this.txtCheckoutAddressLine1, addressLine1, { message: 'Address Line Edit Box' })
            await this.clickOn(this.txtCheckoutAddressLine1, { message: 'Address Line1' })
            await this.page.keyboard.press('ArrowDown')
            await this.page.waitForTimeout(1000)
            await this.clickOn(this.checkoutAddressItem)
            await this.page.waitForTimeout(1000)
            await this.clickOn(this.checkoutAddressItem)
            await this.page.waitForTimeout(1000)
        })
    }

    private async enterPhoneNumber(phoneNumber: string): Promise<void> {
        await test.step('Entering details in the Phone Number EditBox', async () => {
            await this.enterTextInEditBox(this.txtCheckoutPhoneNumber, phoneNumber, { message: 'Phone Number Edit Box' })
        })
    }

    private async clickCheckoutSubmitButton(): Promise<void> {
        await test.step('Clicking the Checkout Submit Button', async () => {
            await this.clickOn(this.btnCheckoutSubmit, { message: 'Checkout Submit Button' })
            await this.verifyElementVisibility(this.checkoutShippingForm, { message: 'Shipping Address and Billing Address Details' })
        })
    }

    private async clickSaveAndContinueButton(): Promise<void> {
        await test.step('Clicking the Save and Continue Button', async () => {
            await this.clickOn(this.btnShippingSubmit, { message: 'Save and Continue Button' })
            await this.page.waitForTimeout(5000)
            await this.verifyElementVisibility(this.txtCreditCardForm, { message: 'Credit Card Details' })
        })
    }

    private async enterCardNumber(cardNumber: string): Promise<void> {
        await test.step('Entering details in Credit card Number EditBox', async () => {
            await this.enterTextInEditBox(this.txtCardNumber, cardNumber, { message: 'Credit Card Edit Box' })
        })
    }

    private async enterCardExpiry(expiry: string): Promise<void> {
        await test.step('Entering details in Credit card Expiry EditBox', async () => {
            await this.enterTextInEditBox(this.txtExpiryDate, expiry, { message: 'Credit Card Expiry Edit Box' })
        })
    }

    private async enterCardCvvNumber(cvvNumber: string): Promise<void> {
        await test.step('Entering details in CVV Number EditBox', async () => {
            await this.enterTextInEditBox(this.txtCvv, cvvNumber, { message: 'CVV Number Edit Box' })
        })
    }

    private async retrieveOrderNumber(): Promise<void> {
        await test.step('Retriving the order number and store it', async () => {
            await this.verifyElementVisibility(this.orderNumberField)
            let orderNumberValue = await this.getElementText(this.orderNumberField, { message: 'Order Number' })
            let textValue = orderNumberValue.replace('#', '')
            let text = textValue.split(":")
            orderNumber = text[1].trim()
            CheckoutPage.orderID = orderNumber
            console.log('Order ID is', orderNumber)
        })
    }

    private async clickSubmitOrder(): Promise<void> {
        await test.step('Clicking the Submit Order Button', async () => {
            await this.clickOn(this.btnPaymentSubmit, { message: 'Submit Order Button' })
            await this.page.waitForTimeout(3000)
            await this.verifyElementVisibility(this.orderSuccessMessage, { message: 'Order Placement Success Message' })
            await this.verifyElementVisibility(this.btnContinueShopping, { message: 'Continue Shopping Button' })
            await this.verifyElementText(this.orderSuccessMessage, 'THANK YOU FOR YOUR ORDER!', { message: 'Order Success Message' })
        })
    }

    public async clickCreateAnAccount(): Promise<void> {
        await test.step('Clicking Create An Account Link', async () => {
            await this.clickOn(this.linkCreateAnAccount, { message: 'Create An Account Link' })
        })
    }

    public async fillNonLoggedInUserCheckoutDetails(email: string, fName: string, lName: string, addressLine1: string, phoneNumber: string): Promise<void> {
        await test.step('Filling all details for Non-logged In User', async () => {
            await this.enterEmail(email)
            await this.enterFirstName(fName)
            await this.enterLastName(lName)
            await this.enterAddress(addressLine1)
            await this.enterPhoneNumber(phoneNumber)
            await this.clickCheckoutSubmitButton()
            await this.clickSaveAndContinueButton()
        })
    }

    public async loggedInUserCheckoutDetails(): Promise<void> {
        await test.step('Filling all details for Logged In User', async () => {
            await this.clickOn(this.btnCheckoutSubmit, { 'message': 'Checkout Submit Button' })
            await this.clickOn(this.btnShippingSubmit, { 'message': 'Shipping Submit Button' })
            await this.clickOn(this.btnShippingSubmit, { 'message': 'Shipping Method Save and Continue' })
        })
    }

    public async fillCardDetailsAndPlaceOrder(cardNumber: string, expiry: string, cvvNumber: string): Promise<void> {
        await test.step('Filling the card details and place order', async () => {
            await this.enterCardNumber(cardNumber)
            await this.enterCardExpiry(expiry)
            await this.enterCardCvvNumber(cvvNumber)
            await this.clickSubmitOrder()
            await this.retrieveOrderNumber()
        })
    }

}