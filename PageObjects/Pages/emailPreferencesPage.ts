import { Locator, Page, test } from "@playwright/test";
import { BasePage } from "./basePage";


export class EmailPreferencesPage extends BasePage {

    private readonly linkLogin: Locator
    private readonly linkCreateAccount: Locator
    private readonly receiveEmailsCheckBox1: Locator
    private readonly receiveEmailsCheckBox2: Locator
    private readonly txtEmailAddress: Locator
    private readonly txtFirstName: Locator
    private readonly txtLastName: Locator
    private readonly btnUpdateSubscription: Locator
    private readonly subscriptionSuccessMessage: Locator
    private readonly successMessageText: Locator
    private readonly btnUnSubscribeAll: Locator
    private readonly unSubscribeSuccessMessageText: Locator
    private readonly unSubscribeReason1: Locator
    private readonly unSubscribeReason2: Locator
    private readonly unSubscribeReason3: Locator
    private readonly btnUnsubscribeSubmit: Locator
    private readonly unSubscribeReasonsSuccessMessage: Locator


    constructor(page: Page) {
        super(page)
        this.linkLogin = page.locator('a[data-analytics-title="login"]')
        this.linkCreateAccount = page.locator('a[data-analytics-title="signup"]')
        this.receiveEmailsCheckBox1 = page.locator('div.checkbox-card-check').nth(0)
        this.receiveEmailsCheckBox2 = page.locator('div.checkbox-card-check').nth(2)
        this.txtEmailAddress = page.locator('input[name="preferenceCenter_email"]').nth(0)
        this.txtFirstName = page.locator('input[name="preferenceCenter_fname"]').nth(0)
        this.txtLastName = page.locator('input[name="preferenceCenter_lname"]').nth(0)
        this.btnUpdateSubscription = page.locator('button[data-analytics-title="update-subscription"]').nth(0)
        this.subscriptionSuccessMessage = page.locator('div.success-wrapper')
        this.successMessageText = page.locator('div.success-message')
        this.btnUnSubscribeAll = page.locator('a[data-analytics-title^="To unsubscribe"]').nth(0)
        this.unSubscribeSuccessMessageText = page.locator('div.success-wrapper p.success-message')
        this.unSubscribeReason1 = page.locator('input#reason-1')
        this.unSubscribeReason2 = page.locator('input#reason-3')
        this.unSubscribeReason3 = page.locator('input#reason-5')
        this.btnUnsubscribeSubmit = page.locator('button.btn.btn-kohle')
        this.unSubscribeReasonsSuccessMessage = page.locator('div.unsubscribe-reasons-success')
    }

    private async verifyLinksAndEditBoxes(): Promise<void> {
        await test.step(`Verify Links And EditBoxes in Email Preferences`, async () => {
            await this.verifyElementVisibility(this.linkLogin, { message: 'Login Link' })
            await this.verifyElementVisibility(this.linkCreateAccount, { message: 'Create Account Link' })
            await this.verifyElementVisibility(this.txtEmailAddress, { message: 'Email Address Edit Box' })
            await this.verifyElementVisibility(this.txtFirstName, { message: 'First Name Edit Box' })
            await this.verifyElementVisibility(this.txtLastName, { message: 'Last Name Edit Box' })
        })

    }

    private async cardSelection(): Promise<void> {
        await test.step(`Cards selection in Email Preferences`, async () => {
            await this.clickOn(this.receiveEmailsCheckBox1, { message: 'Sales & Promotions' })
            await this.clickOn(this.receiveEmailsCheckBox2, { message: 'Limited Editions & Lifestyle' })
        })
    }

    private async fillSignUpDetails(): Promise<void> {
        await test.step(`Filling SignUp Details`, async () => {
            let randomValue: number = Math.floor((Math.random() * 10000) + 1)
            await this.enterTextInEditBox(this.txtEmailAddress, "testemail" + Math.floor((Math.random() * 10000) + 1) + "@logitech.com", { message: 'EmailID Edit Box' })
            await this.enterTextInEditBox(this.txtFirstName, 'FirstName' + randomValue, { message: 'First Name Edit Box' })
            await this.enterTextInEditBox(this.txtLastName, 'LastName' + randomValue, { message: 'Last Name Edit Box' })
        })
    }

    private async clickUpdateSubscription(): Promise<void> {
        await test.step(`Clicking Update Subscription Button`, async () => {
            await this.clickOn(this.btnUpdateSubscription, { message: 'Update Subscription Button' })
            await this.verifyElementVisibility(this.subscriptionSuccessMessage, { message: 'Success Message' })
            await this.verifyElementText(this.successMessageText, 'You have successfully subscribed to Logitech marketing emails.', { message: 'Success Message Text' })
        })
    }

    public async unSubscribeAllValidation(): Promise<void> {
        await test.step(`UnSubcribe All Validation`, async () => {
            await this.clickOn(this.btnUnSubscribeAll, { message: 'UnSubcribe All Button' })
            await this.verifyElementVisibility(this.subscriptionSuccessMessage, { message: 'Un Subscribe Success Message' })
            await this.verifyElementText(this.unSubscribeSuccessMessageText, 'You have successfully unsubscribed', { message: 'Success Message Text' })
            await this.checkBoxSelection(this.unSubscribeReason1, 'check', { message: 'Reason 1 Checkbox' })
            await this.checkBoxSelection(this.unSubscribeReason2, 'check', { message: 'Reason 3 Checkbox' })
            await this.checkBoxSelection(this.unSubscribeReason3, 'check', { message: 'Reason 5 Checkbox' })
            await this.clickOn(this.btnUnsubscribeSubmit, { message: 'Reasons Submit Button' })
            await this.verifyElementVisibility(this.unSubscribeReasonsSuccessMessage, { message: 'Un Subscribe Reasons Success Message' })
        })
    }

    public async nonLoggedInUserEmailPreferencesValidation(): Promise<void> {
        await test.step(`Non LoggedIn User Email Preferences Validation`, async () => {
            await this.verifyLinksAndEditBoxes()
            await this.cardSelection()
            await this.fillSignUpDetails()
            await this.clickUpdateSubscription()
        })
    }

    public async loggedInUserEmailPreferencesValidation(): Promise<void> {
        await test.step(`LoggedIn User Email Preferences Validation`, async () => {
            await this.cardSelection()
            await this.clickUpdateSubscription()
        })
    }
}