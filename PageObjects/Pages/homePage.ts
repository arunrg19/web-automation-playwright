import { expect, Locator, Page, test } from "@playwright/test";
import { BasePage } from "./basePage";
import { FooterComponent } from "../ui-components/footerComponent";

export class HomePage extends BasePage {

    private readonly btnHomePageLogin: Locator
    private readonly btnHomePageCreateAccount: Locator
    private readonly txtUserName: Locator
    private readonly txtPassword: Locator
    private readonly btnLogin: Locator
    private readonly form: Locator
    private readonly homePageLineItems: Locator
    private readonly newAccount_firstName: Locator
    private readonly newAccount_LastName: Locator
    private readonly newAccount_MOB: Locator
    private readonly newAccount_Month: Locator
    private readonly newAccount_Year: Locator
    private readonly newAccount_emailID: Locator
    private readonly newAccount_Password: Locator
    private readonly newAccount_btnCreate: Locator
    private readonly newAccount_emailCheckBox: Locator
    private readonly linkCreateAnAccount: Locator
    private readonly accountCreationSuccess: Locator
    private readonly resendEmail: Locator
    private readonly linkEmailPreferences: Locator
    private readonly linkPaymentOptions: Locator
    private readonly linkEditProfile: Locator
    private readonly linkAddressBook: Locator
    readonly footerComponent: FooterComponent

    constructor(page: Page) {
        super(page)
        this.btnHomePageLogin = page.locator('a[data-component-name="ctaItem"]').filter({ hasText: 'Login' }).nth(0)
        this.btnHomePageCreateAccount = page.locator('a.btn.btn-ko-white')
        this.form = page.locator('#form_container')
        this.homePageLineItems = page.locator('div.layout-item h2')
        this.txtUserName = page.locator('input[id="Email address"]')
        this.txtPassword = page.locator('input[id="Password"]')
        this.btnLogin = page.locator('div.button').filter({ 'hasText': 'Login' })
        this.newAccount_firstName = page.locator('input[id="First name"]')
        this.newAccount_LastName = page.locator('input[id="Last name"]')
        this.newAccount_MOB = page.locator('div.react-date-picker')
        this.newAccount_Month = page.locator('input[name="month"]')
        this.newAccount_Year = page.locator('input[name="year"]')
        this.newAccount_emailID = page.locator('input[id="Email address"]')
        this.newAccount_Password = page.locator('input[id="Password"]')
        this.newAccount_emailCheckBox = page.locator('input.left[type="checkbox"]')
        this.newAccount_btnCreate = page.locator('div.button').filter({ 'hasText': 'Create' })
        this.linkCreateAnAccount = page.locator('a.nav_button_text').filter({ 'hasText': 'Create an Account' })
        this.accountCreationSuccess = page.locator('div.heading.centered')
        this.resendEmail = page.locator('div.button').filter({ 'hasText': 'Resend Email' })
        this.linkEmailPreferences = page.locator('div.content-ctn a').filter({ 'hasText': 'Email Preferences' })
        this.linkPaymentOptions = page.locator('div.content-ctn a').filter({ 'hasText': 'Payment Options' })
        this.linkEditProfile = page.locator('div.content-ctn a').filter({ 'hasText': 'Profile' })
        this.linkAddressBook = page.locator('a[data-analytics-title="address-book"]').filter({ 'hasText': 'Address Book' }).nth(0)
        this.footerComponent = new FooterComponent(this.page)
    }

    public async validateHomeButtons(): Promise<void> {
        await test.step('Validate Login and Create an Account buttons in Home Page', async () => {
            await this.verifyElementVisibility(this.btnHomePageLogin, { message: 'Login Button' })
            await this.verifyElementVisibility(this.btnHomePageCreateAccount, { message: 'Create An Account Button' })
        })
    }

    public async clickCreateAnAccountLink(): Promise<void> {
        await test.step('Clicking Create An Account Link from Login Page', async () => {
            await this.clickOn(this.linkCreateAnAccount, { message: 'Create An Account Link' })
            await this.verifyElementVisibility(this.form, { message: 'Create an account Form' })
        })
    }

    public async clickLoginButton(): Promise<void> {
        await test.step('Clicking Login Button in Home Page', async () => {
            await this.clickOn(this.btnHomePageLogin, { message: 'Home Page Login Button' })
        })
    }

    public async clickEmailPreferences(): Promise<void> {
        await test.step('Clicking Email Preferences Link in Home Page', async () => {
            await this.clickOn(this.linkEmailPreferences, { message: 'Email Preferences' })
        })
    }

    public async clickAddressBook(): Promise<void> {
        await test.step('Clicking Address Book Link in Home Page', async () => {
            await this.clickOn(this.linkAddressBook, { message: 'Address Book' })
        })
    }

    public async clickPaymentOptions(): Promise<void> {
        await test.step('Clicking Payment Options Link in Home Page', async () => {
            await this.clickOn(this.linkPaymentOptions, { message: 'Payment Options' })
        })
    }

    public async clickProfile(): Promise<void> {
        await test.step('Clicking Profile Link in Home Page', async () => {
            await this.clickOn(this.linkEditProfile, { message: 'Profile' })
        })
    }

    public async validateAllSections(): Promise<void> {
        await test.step('Validate all sections in Home Page', async () => {
            await this.verifyElementVisibility(this.homePageLineItems.filter({ hasText: 'Account' }), { message: 'Account Section' })
            await this.verifyElementVisibility(this.homePageLineItems.filter({ hasText: 'Orders' }), { message: 'Orders Section' })
            await this.verifyElementVisibility(this.homePageLineItems.filter({ hasText: 'My Products' }), { message: 'My Products Section' })
            await this.verifyElementVisibility(this.homePageLineItems.filter({ hasText: 'Support' }), { message: 'Support Section' })
            await this.verifyElementVisibility(this.homePageLineItems.filter({ hasText: 'Email' }), { message: 'Email Section' })
            await this.verifyElementVisibility(this.homePageLineItems.filter({ hasText: 'Just for You' }), { message: 'Just For You Section' })
        })
    }

    public async clickhomePageLoginButton(): Promise<void> {
        await test.step('Clicking the Login Button in Home Page', async () => {
            await this.clickOn(this.btnHomePageLogin, { message: 'Home Page Login Button' })
            await this.verifyElementVisibility(this.form, { message: 'Login Form' })
            await this.verifyElementVisibility(this.txtUserName, { message: 'User Name Edit Box' })
            await this.verifyElementVisibility(this.txtPassword, { message: 'Password Edit Box' })
            await this.verifyElementVisibility(this.btnLogin, { message: 'Login Button' })
        })
    }

    public async clickhomeCreateAccount(): Promise<void> {
        await test.step('Clicking the Create Account Button in Home Page', async () => {
            await this.clickOn(this.btnHomePageCreateAccount, { message: 'Home Page Create Account Button' })
            await this.verifyElementVisibility(this.form, { message: 'Create an account Form' })
            await this.verifyElementVisibility(this.newAccount_firstName, { message: 'First Name Edit Box' })
            await this.verifyElementVisibility(this.newAccount_LastName, { message: 'Last Name Edit Box' })
            await this.verifyElementVisibility(this.newAccount_MOB, { message: 'Month and Year Edit Box' })
            await this.verifyElementVisibility(this.newAccount_emailID, { message: 'EmailID Edit Box' })
            await this.verifyElementVisibility(this.newAccount_Password, { message: 'Password Edit Box' })
            await this.verifyElementVisibility(this.newAccount_btnCreate, { message: 'Create Button' })
        })
    }

    public async createAccountValidation(): Promise<void> {
        await test.step('Create Account Validation', async () => {
            let randomValue: number = Math.floor((Math.random() * 10000) + 1)
            await this.enterTextInEditBox(this.newAccount_firstName, "fname" + randomValue, { message: 'First Name Edit Box' })
            await this.enterTextInEditBox(this.newAccount_LastName, "lname" + randomValue, { message: 'Last Name Edit Box' })
            await this.enterTextInEditBox(this.newAccount_Month, '10', { message: 'Month Edit Box' })
            await this.enterTextInEditBox(this.newAccount_Year, '1984', { message: 'Year Edit Box' })
            await this.enterTextInEditBox(this.newAccount_emailID, "testemail" + Math.floor((Math.random() * 1000000) + 1) + "@logitech.com", { message: 'EmailID Edit Box' })
            await this.enterTextInEditBox(this.newAccount_Password, "Security1947P@ssword#" + randomValue, { message: 'Password Edit Box' })
            await this.clickOn(this.newAccount_Password, { message: 'Account Password' })
            await this.checkBoxSelection(this.newAccount_emailCheckBox, 'check', { message: 'Email Check Box' })
            await this.page.waitForTimeout(1000)
            await this.clickOn(this.newAccount_btnCreate, { message: 'Create Button' })
            await this.verifyElementVisibility(this.accountCreationSuccess, { message: 'Account Creation Success Message' })
            await this.verifyElementVisibility(this.resendEmail, { message: 'Resend Email Button Account Creation Success Page' })
        })
    }

}