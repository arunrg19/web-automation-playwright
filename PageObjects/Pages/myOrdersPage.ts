import { Locator, Page, test } from "@playwright/test";
import { BasePage } from "./basePage";
import { CheckoutPage } from "./CheckoutPage";

export class MyOrdersPage extends BasePage {

    private readonly btnOrderDetails: Locator
    private readonly eleOrderDetailsScreen: Locator
    private readonly eleRecentOrders: Locator
    private readonly eleAllOtherOrders: Locator
    private readonly eleHeaderOrderPlaced: Locator
    private readonly eleHeaderOrderNumber: Locator
    private readonly eleHeaderOrdersStatus: Locator
    private readonly legacyOrderDetails: Locator
    private readonly btnTrackPackage: Locator
    private readonly cancelOrderPopup: Locator
    private readonly btnCancelYes: Locator
    private readonly btnCancelNo: Locator
    private readonly cancelSuccessMessage: Locator

    constructor(page: Page) {
        super(page)
        console.log("Order ID:", CheckoutPage.orderID)
        this.btnOrderDetails = page.locator('div[class="order-header"]')
        this.eleOrderDetailsScreen = page.locator('div.order-details-return')
        this.eleRecentOrders = page.locator('.recent-order-detail .order-subtitle').filter({ 'hasText': 'RECENT ORDERS' })
        this.eleAllOtherOrders = page.locator('.order-detail .order-subtitle').filter({ 'hasText': 'ALL OTHER ORDERS' })
        this.eleHeaderOrderPlaced = page.locator('.order-subtitle +div .order-placed span.label')
        this.eleHeaderOrderNumber = page.locator('.order-subtitle +div .order-id .label')
        this.eleHeaderOrdersStatus = page.locator('.order-subtitle +div .order-status .label')
        this.legacyOrderDetails = page.locator('div.order[data-legacy="true"]').nth(0)
        this.btnTrackPackage = page.locator('div.order[data-legacy="true"] a[class="btn btn-ko-kohle"]').nth(0)
        this.cancelOrderPopup = page.locator('div.cancel-order-modal div.order-cancel p').nth(1)
        this.btnCancelYes = page.locator('div.cancel-yes a').nth(1)
        this.btnCancelNo = page.locator('div.cancel-no a').nth(1)
        this.cancelSuccessMessage = page.locator('div.success-message')
    }

    public async openOrderDetails(): Promise<void> {
        await test.step(`Opening the order ${CheckoutPage.orderID} by clicking the order Details button`, async () => {
            console.log("Order ID:", CheckoutPage.orderID)
            await this.verifyElementVisibility(this.btnOrderDetails.filter({ hasText: CheckoutPage.orderID }).locator('a.btn[data-analytics-title*="' + CheckoutPage.orderID + '"]'), { message: `Order Details Button for Order ${CheckoutPage.orderID}` })
            await this.clickOn(this.btnOrderDetails.filter({ hasText: CheckoutPage.orderID }).locator('a.btn[data-analytics-title*="' + CheckoutPage.orderID + '"]'), { message: 'Order Details button' })
            await this.verifyPageURL('/my-account/my-orders/order-details.html')
            await this.verifyElementVisibility(this.eleOrderDetailsScreen, { message: `Order Details Page` })
        })
    }

    public async cancelOrderDetails(): Promise<void> {
        await test.step(`Cancelling the order ${CheckoutPage.orderID} by clicking the cancel order button`, async () => {
            console.log("Order ID:", CheckoutPage.orderID)
            await this.verifyElementVisibility(this.btnOrderDetails.filter({ hasText: CheckoutPage.orderID }).locator('a.btn[data-order-id*="' + CheckoutPage.orderID + '"][data-analytics-title="cancel-order"]'), { message: `Cancel Order Button for Order ${CheckoutPage.orderID}` })
            await this.clickOn(this.btnOrderDetails.filter({ hasText: CheckoutPage.orderID }).locator('a.btn[data-order-id*="' + CheckoutPage.orderID + '"][data-analytics-title="cancel-order"]'), { message: `Cancel Order button for Order ${CheckoutPage.orderID}` })
            await this.validateOrderCancellation()
        })
    }

    public async verifyOrdersSection(): Promise<void> {
        await test.step(`Verify the orders Section RECENT ORDERS and ALL OTHER ORDERS`, async () => {
            await this.page.waitForTimeout(2000)
            await this.verifyElementVisibility(this.eleRecentOrders, { message: `Recent Orders in Orders Page` })
            await this.verifyElementVisibility(this.eleAllOtherOrders, { message: `All Other Orders in Orders Page` })
        })
    }

    public async verifyMyOrderHeaderDetails(): Promise<void> {
        await test.step(`Verify the order Header Details`, async () => {
            await this.verifyElementText(this.eleHeaderOrderPlaced, 'Order Placed', { message: `Order Placed Header` })
            await this.verifyElementText(this.eleHeaderOrderNumber, 'Order #', { message: `Order # Header` })
            await this.verifyElementText(this.eleHeaderOrdersStatus, 'Status', { message: `Order Status Header` })
        })
    }

    public async verifyLegacyDetails(legacyOrdersExist: string): Promise<void> {
        await test.step(`Verify the order Header Details`, async () => {
            if (legacyOrdersExist.toUpperCase() == 'YES') {
                await this.verifyElementVisibility(this.legacyOrderDetails, { message: `Legacy Orders` })
                await this.scrollToElement(this.legacyOrderDetails, { message: `Legacy Orders Section` })
                await this.verifyElementVisibility(this.btnTrackPackage, { message: `Track Package Button` })
                await this.clickOn(this.btnTrackPackage, { message: `Track Package Button` })
            } else {
                await this.verifyElementNotPresent(this.legacyOrderDetails, { message: `Legacy Orders` })
                await this.verifyElementNotPresent(this.btnTrackPackage, { message: `Track Package Button` })
            }
        })
    }

    public async validateOrderCancellation(): Promise<void> {
        await test.step(`Validate order Cancellation from My Orders Page`, async () => {
            await this.verifyElementVisibility(this.cancelOrderPopup, { message: 'Cancel Order PopUp' })
            await this.verifyElementText(this.cancelOrderPopup, 'Are you sure you would like to cancel your order?', { message: 'Cancel Order Pop-up Text' })
            await this.verifyElementVisibility(this.btnCancelYes, { message: 'Cancel Order Yes' })
            await this.verifyElementVisibility(this.btnCancelNo, { message: 'Cancel Order No' })
            await this.clickOn(this.btnCancelYes, { message: 'Cancel Button Yes' })
            await this.verifyElementVisibility(this.cancelSuccessMessage, { message: 'Cancel Order Success Message' })
        })
    }

}