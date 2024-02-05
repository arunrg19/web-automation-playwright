import { Locator, Page, expect, test } from "@playwright/test";
import { BasePage } from "./basePage";



export class EditProfilePage extends BasePage {

    private readonly eleProfileInfo: Locator
    private readonly txtFirstName: Locator
    private readonly btnEditFirstName: Locator
    private readonly btnSaveFirstName: Locator
    private readonly btnCancelFirstName: Locator
    private readonly txtLastName: Locator
    private readonly btnEditLastName: Locator
    private readonly btnSaveLastName: Locator
    private readonly btnCancelLastName: Locator
    private readonly selectLanguage: Locator
    private readonly inputLanguage: Locator
    private readonly btnEditLanguage: Locator
    private readonly btnSaveLanguage: Locator
    private readonly btnCancelLanguage: Locator
    private readonly selectCountry: Locator
    private readonly inputCountry: Locator
    private readonly btnEditCountry: Locator
    private readonly btnSaveCountry: Locator
    private readonly btnCancelCountry: Locator
    private readonly txtDOB: Locator
    private readonly btnEditDOB: Locator
    private readonly btnSaveDOB: Locator
    private readonly btnCancelDOB: Locator
    private readonly txtphone_code: Locator
    private readonly txtPhoneNumber: Locator
    private readonly btnEditPhoneNumber: Locator
    private readonly btnSavePhoneNumber: Locator
    private readonly btnCancelPhoneNumber: Locator
    private readonly linkAddressBook: Locator
    private readonly linkMyOrders: Locator

    constructor(page: Page) {
        super(page)
        this.eleProfileInfo = page.locator('div.profile-information')
        this.linkAddressBook = page.locator('a[href="/es-mx/my-account/address-book.html"]').nth(0)
        this.linkMyOrders = page.locator('a[href="/es-mx/my-account/my-orders.html"]').nth(0)
        this.inputLanguage = page.locator('input[name="signup-language"]')
        this.inputCountry = page.locator('input[name="signup-country"]')
        this.btnEditFirstName = page.locator('div.form-field.editable').filter({ 'hasText': 'First name' }).locator('button.btn.btn-link').filter({ 'hasText': 'Edit' })
        this.btnEditLastName = page.locator('div.form-field.editable').filter({ 'hasText': 'Last name' }).locator('button.btn.btn-link').filter({ 'hasText': 'Edit' })
        this.btnEditLanguage = page.locator('div.form-field.editable').filter({ 'hasText': 'Language' }).locator('button.btn.btn-link').filter({ 'hasText': 'Edit' })
        this.btnEditCountry = page.locator('div.form-field.editable').filter({ 'hasText': 'Country' }).locator('button.btn.btn-link').filter({ 'hasText': 'Edit' })
        this.btnEditDOB = page.locator('div.form-field.editable').filter({ 'hasText': 'Birthday' }).locator('button.btn.btn-link').filter({ 'hasText': 'Edit' })
        this.btnEditPhoneNumber = page.locator('div.form-field.editable').filter({ 'hasText': 'Phone (optional)' }).locator('button.btn.btn-link').filter({ 'hasText': 'Edit' })

        this.btnSaveFirstName = page.locator('div.form-field.editable').filter({ 'hasText': 'First name' }).locator('button.btn.edit-save.btn-kohle').filter({ 'hasText': 'Save' })
        this.btnSaveLastName = page.locator('div.form-field.editable').filter({ 'hasText': 'Last name' }).locator('button.btn.edit-save.btn-kohle').filter({ 'hasText': 'Save' })
        this.btnSaveLanguage = page.locator('div.form-field.editable').filter({ 'hasText': 'Language' }).locator('button.btn.edit-save.btn-kohle').filter({ 'hasText': 'Save' })
        this.btnSaveCountry = page.locator('div.form-field.editable').filter({ 'hasText': 'Country' }).locator('button.btn.edit-save.btn-kohle').filter({ 'hasText': 'Save' })
        this.btnSaveDOB = page.locator('div.form-field.editable').filter({ 'hasText': 'Birthday' }).locator('button.btn.edit-save.btn-kohle').filter({ 'hasText': 'Save' })
        this.btnSavePhoneNumber = page.locator('div.form-field.editable').filter({ 'hasText': 'Phone (optional)' }).locator('button.btn.edit-save.btn-kohle').filter({ 'hasText': 'Save' })

        this.btnCancelFirstName = page.locator('div.form-field.editable').filter({ 'hasText': 'First name' }).locator('button.btn.btn-link.cancel').filter({ 'hasText': 'Cancel' })
        this.btnCancelLastName = page.locator('div.form-field.editable').filter({ 'hasText': 'Last name' }).locator('button.btn.btn-link.cancel').filter({ 'hasText': 'Cancel' })
        this.btnCancelLanguage = page.locator('div.form-field.editable').filter({ 'hasText': 'Language' }).locator('button.btn.btn-link.cancel').filter({ 'hasText': 'Cancel' })
        this.btnCancelCountry = page.locator('div.form-field.editable').filter({ 'hasText': 'Country' }).locator('button.btn.btn-link.cancel').filter({ 'hasText': 'Cancel' })
        this.btnCancelDOB = page.locator('div.form-field.editable').filter({ 'hasText': 'Birthday' }).locator('button.btn.btn-link.cancel').filter({ 'hasText': 'Cancel' })
        this.btnCancelPhoneNumber = page.locator('div.form-field.editable').filter({ 'hasText': 'Phone (optional)' }).locator('button.btn.btn-link.cancel').filter({ 'hasText': 'Cancel' })

        this.txtFirstName = page.locator('input#profile-firstname')
        this.txtLastName = page.locator('input#profile-lastname')
        this.selectLanguage = page.locator('select#profile-language')
        this.selectCountry = page.locator('select#profile-country')
        this.txtDOB = page.locator('input#profile-birthday')
        this.txtphone_code = page.locator('input#profile-phone-code')
        this.txtPhoneNumber = page.locator('input#profile-phone')
    }

    public async verifyProfileInfoForNonEnUS(): Promise<void> {
        await test.step('Verifying the Profile Information Details', async () => {
            await this.verifyElementVisibility(this.eleProfileInfo)
            await expect(this.linkAddressBook).not.toBeVisible()
            await expect(this.linkMyOrders).not.toBeVisible()
        })  
    }

    private async firstNameEditSaveVerification(): Promise<void> {
        await test.step('Clicking the First Name Edit/Save Button', async () => {
            await this.clickOn(this.btnEditFirstName, { message: 'First Name Edit Button' })
            await this.verifyElementVisibility(this.txtFirstName, { message: 'First Name Edit Box' })
            await this.enterTextInEditBox(this.txtFirstName, 'Verify Save', { message: 'First Name Edit Box' })
            await this.clickOn(this.btnSaveFirstName, { message: 'First Name Save Button' })
            await this.clickOn(this.btnEditFirstName, { message: 'First Name Edit Button' })
            await this.verifyEditboxValue(this.txtFirstName, 'Verify Save', { message: 'First Name Edit Box' })
            await this.clickOn(this.btnSaveFirstName, { message: 'First Name Save Button' })
        })
    }

    private async firstNameEditCancelVerification(): Promise<void> {
        await test.step('Clicking the First Name Cancel Button', async () => {
            await this.clickOn(this.btnEditFirstName, { message: 'First Name Edit Button' })
            await this.verifyElementVisibility(this.txtFirstName, { message: 'First Name Edit Box' })
            await this.enterTextInEditBox(this.txtFirstName, 'Verify Cancel', { message: 'First Name Edit Box' })
            await this.clickOn(this.btnCancelFirstName, { message: 'First Name Cancel Button' })
            await this.clickOn(this.btnEditFirstName, { message: 'First Name Edit Button' })
            await this.verifyEditboxValueNotPresent(this.txtFirstName, 'Verify Cancel', { message: 'First Name Edit Box' })
            await this.clickOn(this.btnCancelFirstName, { message: 'First Name Cancel Button' })
        })
    }

    private async lastNameEditSaveVerification(): Promise<void> {
        await test.step('Clicking the Last Name Edit/Save Button', async () => {
            await this.clickOn(this.btnEditLastName, { message: 'Last Name Edit Button' })
            await this.verifyElementVisibility(this.txtLastName, { message: 'Last Name Edit Box' })
            await this.enterTextInEditBox(this.txtLastName, 'Verify Save', { message: 'Last Name Edit Box' })
            await this.clickOn(this.btnSaveLastName, { message: 'Last Name Save Button' })
            await this.clickOn(this.btnEditLastName, { message: 'Last Name Edit Button' })
            await this.verifyEditboxValue(this.txtLastName, 'Verify Save', { message: 'Last Name Edit Box' })
            await this.clickOn(this.btnSaveLastName, { message: 'Last Name Save Button' })
        })
    }

    private async lastNameEditCancelVerification(): Promise<void> {
        await test.step('Clicking the Last Name Cancel Button', async () => {
            await this.clickOn(this.btnEditLastName, { message: 'Last Name Edit Button' })
            await this.verifyElementVisibility(this.txtLastName, { message: 'Last Name Edit Box' })
            await this.enterTextInEditBox(this.txtLastName, 'Verify Cancel', { message: 'Last Name Edit Box' })
            await this.clickOn(this.btnCancelLastName, { message: 'Last Name Cancel Button' })
            await this.clickOn(this.btnEditLastName, { message: 'Last Name Edit Button' })
            await this.verifyEditboxValueNotPresent(this.txtLastName, 'Verify Cancel', { message: 'Last Name Edit Box' })
            await this.clickOn(this.btnCancelLastName, { message: 'Last Name Cancel Button' })
        })
    }

    private async selectLanguageEditSaveVerification(): Promise<void> {
        await test.step('Select Language drop down Edit/Save Button', async () => {
            await this.clickOn(this.btnEditLanguage, { message: 'Language Edit Drop Down' })
            await this.selectDropDownValue(this.selectLanguage, 'English - Australia', { message: 'Language Drop Down' })
            await this.clickOn(this.btnSaveLanguage, { message: 'Language Save Button' })
            await this.clickOn(this.btnEditLanguage, { message: 'Language Edit Drop Down' })
            await this.verifyEditboxValue(this.inputLanguage, 'English - Australia', { message: 'Language Drop Down' })
            await this.clickOn(this.btnSaveLanguage, { message: 'Language Save Button' })
        })
    }

    private async selectLanguageEditCancelVerification(): Promise<void> {
        await test.step('Select Language drop down Cancel Button', async () => {
            await this.clickOn(this.btnEditLanguage, { message: 'Language Edit Drop Down' })
            await this.selectDropDownValue(this.selectLanguage, 'Melayu - Malaysia', { message: 'Language Drop Down' })
            await this.clickOn(this.btnCancelLanguage, { message: 'Language Cancel Button' })
            await this.clickOn(this.btnEditLanguage, { message: 'Language Edit Drop Down' })
            await this.verifyEditboxValueNotPresent(this.inputLanguage, 'Melayu - Malaysia', { message: 'Language Drop Down' })
            await this.clickOn(this.btnCancelLanguage, { message: 'Language Cancel Button' })
        })
    }

    private async selectCountryEditSaveVerification(): Promise<void> {
        await test.step('Select Country drop down Edit/Save Button', async () => {
            await this.clickOn(this.btnEditCountry, { message: 'Country Edit Drop Down' })
            await this.selectDropDownValue(this.selectCountry, 'Australia', { message: 'Country Drop Down' })
            await this.clickOn(this.btnSaveCountry, { message: 'Country Save Button' })
            await this.clickOn(this.btnEditCountry, { message: 'Country Edit Drop Down' })
            await this.verifyEditboxValue(this.inputCountry, 'Australia', { message: 'Country Drop Down' })
            await this.clickOn(this.btnSaveCountry, { message: 'Country Save Button' })
        })
    }

    private async selectCountryEditCancelVerification(): Promise<void> {
        await test.step('Select Country drop down Cancel Button', async () => {
            await this.clickOn(this.btnEditCountry, { message: 'Country Edit Drop Down' })
            await this.selectDropDownValue(this.selectCountry, 'Bangladesh', { message: 'Country Drop Down' })
            await this.clickOn(this.btnCancelCountry, { message: 'Country Cancel Button' })
            await this.clickOn(this.btnEditCountry, { message: 'Country Edit Drop Down' })
            await this.verifyEditboxValueNotPresent(this.inputCountry, 'Bangladesh', { message: 'Country Drop Down' })
            await this.clickOn(this.btnCancelCountry, { message: 'Country Cancel Button' })
        })
    }

    private async DOBEditSaveVerification(): Promise<void> {
        await test.step('Clicking the DOB Edit/Save Button', async () => {
            await this.clickOn(this.btnEditDOB, { message: 'DOB Edit Button' })
            await this.verifyElementVisibility(this.txtDOB, { message: 'DOB Edit Box' })
            await this.enterTextInEditBox(this.txtDOB, '2012-12-12', { message: 'DOB Edit Box' })
            await this.clickOn(this.btnSaveDOB, { message: 'DOB Save Button' })
            await this.clickOn(this.btnEditDOB, { message: 'DOB Edit Button' })
            await this.verifyEditboxValue(this.txtDOB, '2012-12-12', { message: 'DOB Edit Box' })
            await this.clickOn(this.btnSaveDOB, { message: 'DOB Save Button' })
        })
    }

    private async DOBEditCancelVerification(): Promise<void> {
        await test.step('Clicking the DOB Cancel Button', async () => {
            await this.clickOn(this.btnEditDOB, { message: 'DOB Edit Button' })
            await this.verifyElementVisibility(this.txtDOB, { message: 'DOB Edit Box' })
            await this.enterTextInEditBox(this.txtDOB, '1989-12-12', { message: 'DOB Edit Box' })
            await this.clickOn(this.btnCancelDOB, { message: 'DOB Cancel Button' })
            await this.clickOn(this.btnEditDOB, { message: 'DOB Edit Button' })
            await this.verifyEditboxValueNotPresent(this.txtDOB, '1989-12-12', { message: 'DOB Edit Box' })
            await this.clickOn(this.btnCancelDOB, { message: 'DOB Cancel Button' })
        })
    }

    private async phoneNumberEditSaveVerification(): Promise<void> {
        await test.step('Clicking the Phone Number Edit/Save Button', async () => {
            await this.clickOn(this.btnEditPhoneNumber, { message: 'Phone Number Edit Button' })
            await this.verifyElementVisibility(this.txtPhoneNumber, { message: 'Phone Number Edit Box' })
            await this.enterTextInEditBox(this.txtphone_code, '+61', { message: 'Phone Code Edit Box' })
            await this.enterTextInEditBox(this.txtPhoneNumber, '468439894', { message: 'Phone Number Edit Box' })
            await this.clickOn(this.btnSavePhoneNumber, { message: 'Phone Number Save Button' })
            await this.clickOn(this.btnEditPhoneNumber, { message: 'Phone Number Edit Button' })
            await this.verifyEditboxValue(this.txtPhoneNumber, '468439894', { message: 'Phone Number Edit Box' })
            await this.clickOn(this.btnSavePhoneNumber, { message: 'Phone Number Save Button' })
        })
    }

    private async phoneNumberEditCancelVerification(): Promise<void> {
        await test.step('Clicking the Phone Number Cancel Button', async () => {
            await this.clickOn(this.btnEditPhoneNumber, { message: 'Phone Number Edit Button' })
            await this.verifyElementVisibility(this.txtPhoneNumber, { message: 'Phone Number Edit Box' })
            await this.enterTextInEditBox(this.txtPhoneNumber, '9973672617', { message: 'Phone Number Edit Box' })
            await this.clickOn(this.btnCancelPhoneNumber, { message: 'Phone Number Cancel Button' })
            await this.clickOn(this.btnEditPhoneNumber, { message: 'Phone Number Edit Button' })
            await this.verifyEditboxValueNotPresent(this.txtPhoneNumber, '9973672617', { message: 'Phone Number Edit Box' })
            await this.clickOn(this.btnCancelPhoneNumber, { message: 'Phone Number Cancel Button' })
        })
    }

    public async validateEditProfileSave(): Promise<void> {
        await test.step('Verify Edit Profile Save functionalities', async () => {
            await this.firstNameEditSaveVerification()
            await this.lastNameEditSaveVerification()
            await this.selectLanguageEditSaveVerification()
            await this.selectCountryEditSaveVerification()
            await this.DOBEditSaveVerification()
            await this.verifyElementNotPresent(this.txtPhoneNumber, {'message':'Phone Number Field'})
            // await this.phoneNumberEditSaveVerification()         //=> Commented this code as per the card : AEMU-4633
        })
    }

    public async validateEditProfileCancel(): Promise<void> {
        await test.step('Verify Edit Profile Cancel functionalities', async () => {
            await this.firstNameEditCancelVerification()
            await this.lastNameEditCancelVerification()
            await this.selectLanguageEditCancelVerification()
            await this.selectCountryEditCancelVerification()
            await this.DOBEditCancelVerification()
            await this.verifyElementNotPresent(this.txtPhoneNumber, {'message':'Phone Number Field'})
            // await this.phoneNumberEditCancelVerification()       //=> Commented this code as per the card : AEMU-4633
        })
    }  

}