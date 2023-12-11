import { Locator, Page, test } from '@playwright/test'
import { BasePage } from './basePage'

export class LoginPage extends BasePage {

    public readonly txtUserName: Locator
    public readonly txtPassword: Locator
    private readonly btnLogin: Locator
    private readonly verifyLogin: Locator
    private readonly linkLogout: Locator

    constructor(page: Page) {
        super(page)
        this.txtUserName = page.locator('input[id="Email address"]')
        this.txtPassword = page.locator('input[id="Password"]')
        this.btnLogin = page.locator('div.button').filter({ 'hasText': 'Login' })
        this.verifyLogin = page.locator('a.btn-link').filter({ 'hasText': 'Edit Profile' || 'EDIT PROFILE' })
        this.linkLogout = page.locator('a.btn-link.component-logout')
    }

    private async enterUserName(userName: string): Promise<void> {
        await test.step('Entering username in the userID EditBox', async () => {
            await this.enterTextInEditBox(this.txtUserName, userName, { message: 'User Name Edit Box' })
        })
    }

    private async enterPassword(password: string): Promise<void> {
        await test.step('Entering username in the Password EditBox', async () => {
            await this.enterTextInEditBox(this.txtPassword, password, { message: 'Password Edit Box' })
        })
    }

    private async clickLoginButton(): Promise<void> {
        await test.step('Clicking the Login Button', async () => {
            await this.clickOn(this.btnLogin, { message: 'Login Button' })
        })
    }

    private async clickLogoutButton(): Promise<void> {
        await test.step('Clicking the Logout Button', async () => {
            await this.clickOn(this.linkLogout, { message: 'Logout Button' })
        })
    }

    public async loginIntoMyAccountApplication(userName: string, password: string): Promise<void> {
        await test.step('Login into Application', async () => {
            await this.enterUserName(userName)
            await this.enterPassword(password)
            await this.clickLoginButton()
            await this.verifyElementVisibility(this.verifyLogin, { message: "Edit Profile Link Validation" })
        })
    }

    public async logoutFromMyAccountApplication(): Promise<void> {
        await test.step('Logout from Application', async () => {
            await this.clickLogoutButton()
        })
    }

}