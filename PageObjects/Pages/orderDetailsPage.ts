import { Locator, Page, test } from "@playwright/test";
import { BasePage } from "./basePage";
import { CheckoutPage } from "./CheckoutPage";

export class OrderDetailsPage extends BasePage {

    private readonly orderID: Locator
    private readonly orderDate: Locator
    private readonly orderStatus: Locator
    private readonly billingAddressDetails: Locator
    private readonly shippingAddressDetails: Locator
    private readonly btnCancelOrder: Locator
    private readonly cancelOrderPopup: Locator
    private readonly btnCancelYes: Locator
    private readonly btnCancelNo: Locator
    private readonly cancelSuccessMessage: Locator
    private readonly btnInvoice: Locator
    private readonly eleRefreshError: Locator
    private readonly eleRefreshErrorMsg: Locator
    private readonly linkBackToOrders: Locator
    private readonly btnOrderDetailsAcceptedOrder: Locator

    constructor(page: Page) {
        super(page)
        this.orderID = page.locator('div.order-details-return #commerceOrderID')
        this.orderDate = page.locator('div.order-details-return #commerceOrderDate')
        this.orderStatus = page.locator('div.order-details-return #commerceOrderStatus')
        this.billingAddressDetails = page.locator('div#commerceBillingAddress')
        this.shippingAddressDetails = page.locator('div#shippingAddress')
        this.btnCancelOrder = page.locator('a.btn[aria-label="Cancel Order"]')
        this.cancelOrderPopup = page.locator('div.cancel-order-modal div.order-cancel p').nth(1)
        this.btnCancelYes = page.locator('div.cancel-yes a').nth(1)
        this.btnCancelNo = page.locator('div.cancel-no a').nth(1)
        this.cancelSuccessMessage = page.locator('div.success-message')
        this.btnInvoice = page.locator('a.btn[aria-label="View Invoice"]')
        this.eleRefreshError = page.locator('div#dr_CustomerServiceOrderList h1')
        this.eleRefreshErrorMsg = page.locator('div#dr_CustomerServiceOrderList')
        this.linkBackToOrders = page.locator('a[data-analytics-title="back-to-main-page"]')
        this.btnOrderDetailsAcceptedOrder = page.locator('div.order-header').filter({'hasText':'Accepted'}).nth(0).locator('a.btn.btn-buy-kohle-default')
    }

    private async verifyOrderID(): Promise<void> {
        await test.step(`Verifying the OrderID details`, async () => {
            await this.verifyElementText(this.orderID, CheckoutPage.orderID, { message: 'Order#' })
        })
    }

    private async verifyOrderDate(): Promise<void> {
        await test.step(`Verifying the Order Date details`, async () => {
            await this.verifyElementVisibility(this.orderDate, { message: 'Order Date' })
        })
    }

    private async verifyOrderStatus(): Promise<void> {
        await test.step(`Verifying the Order Status details`, async () => {
            await this.verifyElementVisibility(this.orderStatus, { message: 'Order Status' })
        })
    }

    public async verifyInVoiceButton(invoiceButtonExist: string): Promise<void> {
        await test.step(`Validating the Invoice Button Existence`, async () => {
            if (invoiceButtonExist.toUpperCase() == 'YES') {
                await this.verifyElementVisibility(this.btnInvoice, { message: 'Invoice Button' })
            } else {
                await this.verifyElementNotPresent(this.btnInvoice, { message: 'Invoice Button' })
            }
        })
    }

    private async verifyAddressDetails(): Promise<void> {
        await test.step(`Verifying the Billing and Shipping address details`, async () => {
            await this.verifyElementVisibility(this.billingAddressDetails, { message: 'Billing Address Details' })
            await this.verifyElementVisibility(this.shippingAddressDetails, { message: 'Shipping Address Details' })
        })
    }

    private async clickCancelOrderAndVerifyCancellation(): Promise<void> {
        await test.step(`Clicking the Cancel Button and validate order Cancellation`, async () => {
            await this.verifyElementVisibility(this.btnCancelOrder, { message: 'Button Cancel Order' })
            await this.clickOn(this.btnCancelOrder, { message: 'Cancel Button' })
            await this.verifyElementVisibility(this.cancelOrderPopup, { message: 'Cancel Order PopUp' })
            await this.verifyElementText(this.cancelOrderPopup, 'Are you sure you would like to cancel your order?', { message: 'Cancel Order Pop-up Text' })
            await this.verifyElementVisibility(this.btnCancelYes, { message: 'Cancel Order Yes' })
            await this.verifyElementVisibility(this.btnCancelNo, { message: 'Cancel Order No' })
            await this.clickOn(this.btnCancelYes, { message: 'Cancel Button Yes' })
            await this.verifyElementVisibility(this.cancelSuccessMessage, { message: 'Cancel Order Success Message' })
            await this.verifyElementText(this.orderStatus, 'Cancelled', { message: 'Order Status Text' })
        })
    }

    public async cancelOrderDetails(): Promise<void> {
        await test.step(`Cancel Order Details`, async () => {
            await this.verifyPageURL('my-account/my-orders/order-details.html')
            await this.verifyOrderID()
            await this.verifyOrderDate()
            await this.verifyOrderStatus()
            await this.verifyAddressDetails()
            await this.clickCancelOrderAndVerifyCancellation()
        })
    }

    public async validateAcceptedOrderDetails(): Promise<void> {
        await test.step(`[ACCEPTED ORDER] Order Details Validation`, async () => {
            await this.verifyPageURL('my-account/my-orders/order-details.html')
            await this.verifyElementVisibility(this.orderID, { message: 'Order ID' })
            await this.verifyOrderDate()
            await this.verifyOrderStatus()
            await this.verifyAddressDetails()
            await this.verifyInVoiceButton('NO')
        })
    }

    public async refreshErrorAcceptedOnOrderDetailsPage(): Promise<void> {
        await test.step(`Refresh Page Error Validation`, async () => {
            await this.clickOn(this.btnOrderDetailsAcceptedOrder)
            await this.verifyPageURL('my-account/my-orders/order-details.html')
            await this.page.waitForTimeout(2000)
            await this.page.reload()
            await this.verifyElementVisibility(this.eleRefreshError, { 'message': 'Refresh Error Header' })
            await this.verifyElementVisibility(this.eleRefreshErrorMsg, { 'message': 'Refresh Error Header' })
            await this.clickOn(this.linkBackToOrders, { 'message': 'Link Go Back to Order Status' })            
        })
    }

    public async refreshErrorValidation(): Promise<void> {
        await test.step(`Refresh Page Error Validation`, async () => {
            await this.page.reload()
            await this.verifyElementVisibility(this.eleRefreshError, { 'message': 'Refresh Error Header' })
            await this.verifyElementVisibility(this.eleRefreshErrorMsg, { 'message': 'Refresh Error Header' })
            await this.clickOn(this.linkBackToOrders, { 'message': 'Link Go Back to Order Status' })
        })
    }

    public async wrongOrderDetailsErrorValidation(): Promise<void> {
        await test.step(`Wrong Order Details Error Validation`, async () => {
            await this.verifyElementVisibility(this.eleRefreshError, { 'message': 'Wrong Order Error Header' })
            await this.verifyElementVisibility(this.eleRefreshErrorMsg, { 'message': 'Refresh Error Header' })
            await this.clickOn(this.linkBackToOrders, { 'message': 'Link Go Back to Order Status' })
        })
    }

}