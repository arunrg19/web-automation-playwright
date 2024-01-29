import { Locator, Page, test } from "@playwright/test"
import { BasePage } from "./basePage"

//LoginPage
export class TestPage extends BasePage {

    //Part1
    private readonly txtUserName: Locator
    private readonly txtPwd: Locator
    private readonly btnLogin: Locator

    constructor(page: Page) {
        super(page)
        this.txtUserName = page.locator('input[id="Email address"]')
        this.txtPwd = page.locator('input[id="Password"]')
        this.btnLogin = page.locator('div.button')
    }

    //Part2
    private async enterUserName(): Promise<void> {
        await test.step(`Entering a value in Email ID Field`, async () => {
            // await this.txtUserName.fill('aganesh@logitech.com')
            await this.enterTextInEditBox(this.txtUserName, 'aganesh@logitech.com', { 'message': "User Name Edit Box" })
        })
    }

    private async enterPassword(): Promise<void> {
        await test.step(`Entering a value in Paswword Field`, async () => {
            // await this.txtPwd.fill('Logitech@12345')
            await this.enterTextInEditBox(this.txtPwd, 'Logitech@12345', { 'message': "Password Edit Box" })
        })
    }

    private async clickLoginButton(): Promise<void> {
        await test.step(`Clicking the Login Button`, async () => {
            // await this.btnLogin.click()
            await this.clickOn(this.btnLogin, { 'message': "Login Button" })
        })
    }

    public async loginIntoApplication(): Promise<void> {
        await test.step(`Logging into Application`, async () => {
            await this.enterUserName()
            await this.enterPassword()
            await this.clickLoginButton()
        })
    }

}