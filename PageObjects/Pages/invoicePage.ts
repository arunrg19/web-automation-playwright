import { Locator, Page, test, expect } from "@playwright/test";
import { BasePage } from "./basePage";
import path from 'path'

export class InvoicePage extends BasePage {

    private readonly eleOrderNumber: Locator
    private readonly eleOrderDate: Locator
    private readonly eleBillingAddress: Locator
    private readonly eleShippingAddress: Locator
    private readonly eleProductDetails: Locator
    private readonly eleSubTotal: Locator
    private readonly eleDiscount: Locator
    private readonly eleShipping: Locator
    private readonly eleTax: Locator
    private readonly eleTotal: Locator
    private readonly eleInvoices: Locator
    private readonly linkDownLoadInvoice: Locator

    constructor(page: Page) {
        super(page)
        this.eleOrderNumber = page.locator('p#commerceOrderID')
        this.eleOrderDate = page.locator('p#commerceOrderDate')
        this.eleBillingAddress = page.locator('div#commerceBillingAddress')
        this.eleShippingAddress = page.locator('div#commerceShippingAddress')
        this.eleProductDetails = page.locator('table#invoiceDetailsTbl')
        this.eleSubTotal = page.locator('tbody.borderBottom tr:not([class*="borderBottom"])').nth(1)
        this.eleDiscount = page.locator('tbody.borderBottom tr:not([class*="borderBottom"])').nth(2)
        this.eleShipping = page.locator('tbody.borderBottom tr:not([class*="borderBottom"])').nth(3)
        this.eleTax = page.locator('tbody.borderBottom tr:not([class*="borderBottom"])').nth(4)
        this.eleTotal = page.locator('tbody.borderBottom tr:not([class*="borderBottom"])').nth(5)
        this.eleInvoices = page.locator('div.download-invoices-list').nth(0)
        this.linkDownLoadInvoice = page.locator('a[data-analytics-title="download-invoice"]')
    }

    private async verifyOrderNumber() {
        await test.step(`Verify the Order Number`, async () => {
            await this.verifyElementVisibility(this.eleOrderNumber, { 'message': 'Order Number Element' })
            await this.verifyElementText(this.eleOrderNumber, 'Order #:', { 'message': "Validating the text 'Order #:'" })
        })
    }

    private async verifyOrderDate() {
        await test.step(`Verify the Order Date`, async () => {
            await this.verifyElementVisibility(this.eleOrderDate, { 'message': 'Order Date Element' })
            await this.verifyElementText(this.eleOrderDate, 'Order Date:', { 'message': "Validating the text 'Order Date:'" })
        })
    }

    private async verifyBillingAddress() {
        await test.step(`Verify the Billing Address`, async () => {
            await this.verifyElementVisibility(this.eleBillingAddress, { 'message': 'Billing Address Element' })
        })
    }

    private async verifyShippingAddress() {
        await test.step(`Verify the Shipping Address`, async () => {
            await this.verifyElementVisibility(this.eleShippingAddress, { 'message': 'Shipping Address Element' })
        })
    }

    private async verifyProductDetails() {
        await test.step(`Verify the Product Address`, async () => {
            await this.verifyElementVisibility(this.eleProductDetails, { 'message': 'Product Details Element' })
        })
    }

    private async verifySubTotal() {
        await test.step(`Verify the Sub Total`, async () => {
            await this.verifyElementVisibility(this.eleSubTotal, { 'message': 'Sub Total Element' })
        })
    }

    private async verifyDiscount() {
        await test.step(`Verify the Discount Details`, async () => {
            await this.verifyElementVisibility(this.eleDiscount, { 'message': 'Discount Details Element' })
            await this.verifyElementText(this.eleDiscount, 'Discount(s):', { 'message': "Validating the text 'Discount(s):'" })
        })
    }

    private async verifyShipping() {
        await test.step(`Verify the Shipping Details`, async () => {
            await this.verifyElementVisibility(this.eleShipping, { 'message': 'Shipping Details Element' })
            await this.verifyElementText(this.eleShipping, 'Shipping:', { 'message': "Validating the text 'Shipping:'" })
        })
    }

    private async verifyTax() {
        await test.step(`Verify the Tax Details`, async () => {
            await this.verifyElementVisibility(this.eleTax, { 'message': 'Tax Details Element' })
            await this.verifyElementText(this.eleTax, 'Tax:', { 'message': "Validating the text 'Tax:'" })
        })
    }

    private async verifyTotal() {
        await test.step(`Verify the Total Details`, async () => {
            await this.verifyElementVisibility(this.eleTotal, { 'message': 'Total Details Element' })
        })
    }

    private async verifyDownLoadInvoices(testcaseFolderPath: string) {
        await test.step(`Verify the DownLoad Invoice Details`, async () => {
            await this.verifyElementVisibility(this.eleInvoices, { 'message': 'DownLoad Invoice Links' })
            await this.scrollToElement(this.eleInvoices, { 'message': 'Invoices Section' })
            await this.page.waitForTimeout(1000)
            let count = await this.getElementsCount(this.linkDownLoadInvoice)
            for (let i = 1; i <= count; i++) {
                const fileDownLoadPromise = this.page.waitForEvent('download')
                await this.clickOn(this.linkDownLoadInvoice.nth(i - 1), { 'message': `Invoice Link Number ` + i })
                const fileDownload = await fileDownLoadPromise
                await fileDownload.saveAs(path.join("downloads/" + testcaseFolderPath + "/" + fileDownload.suggestedFilename()))
            }
            await this.verifyFilesCount("downloads/" + testcaseFolderPath, count, { 'message': 'Downloads Folder Path Verification' })
            await this.deleteAllFilesInDir("downloads/" + testcaseFolderPath, { 'message': `Deleting all files from the folder ${testcaseFolderPath}` })        
        })
    }

    public async validateCompleteOrderDetails(testcaseFolderPath: string) {
        await test.step(`Verify the COMPLETE Order Details - Download Invoices`, async () => {
            await this.verifyOrderNumber()
            await this.verifyOrderDate()
            await this.verifyBillingAddress()
            await this.verifyShippingAddress()
            await this.verifyProductDetails()
            await this.verifySubTotal()
            await this.verifyDiscount()
            await this.verifyShipping()
            await this.verifyTax()
            await this.verifyTotal()
            await this.verifyDownLoadInvoices(testcaseFolderPath)
        })
    }

}