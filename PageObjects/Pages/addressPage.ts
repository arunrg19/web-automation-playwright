import { expect, Locator, Page, test } from "@playwright/test";
import { BasePage } from "./basePage";


export class AddressPage extends BasePage {

    private readonly addressView: Locator
    private readonly addAddressPopUp: Locator
    private readonly txtAddressNickName: Locator
    private readonly txtAddressFirstName: Locator
    private readonly txtAddressLastName: Locator
    private readonly txtAddressstreetName: Locator
    private readonly txtAddressApartmentName: Locator
    private readonly selectAddressCountry: Locator
    private readonly txtAddressStateName: Locator
    private readonly txtAddressCityName: Locator
    private readonly txtAddressPostCode: Locator
    private readonly txtPhoneNumber: Locator
    private readonly chkDefaultAddress: Locator
    private readonly btnSaveAddress: Locator
    private readonly addressCount: Locator
    private readonly editAddressIcon: Locator
    private readonly deleteAddressIcon: Locator
    private readonly btnDeletePopUp: Locator
    private readonly btnSaveEditAddress: Locator
    private readonly savedAddress_Name: Locator
    private readonly savedAddress_StreetName: Locator
    private readonly savedAddress_ApartmentName: Locator
    private readonly savedAddress_City_State: Locator
    private readonly savedAddress_PhoneNumber: Locator
    private readonly btnAddAddress: string

    constructor(page: Page) {
        super(page)
        this.btnAddAddress = "div.card.add-new-card button +div.label"
        this.btnDeletePopUp = page.locator(".delete-address-modal button.btn-error")
        this.addressView = page.locator('div.address-view')
        this.addAddressPopUp = page.locator('div[data-view="address-modal"]')
        this.txtAddressNickName = page.locator('#address-nickname')
        this.txtAddressFirstName = page.locator('#address-firstname')
        this.txtAddressLastName = page.locator('#address-lastname')
        this.txtAddressstreetName = page.locator('#address-street')
        this.txtAddressApartmentName = page.locator('#address-apartment')
        this.selectAddressCountry = page.locator('select#address-country')
        this.txtAddressStateName = page.locator('select#address-state')
        this.txtAddressCityName = page.locator('#address-city')
        this.txtAddressPostCode = page.locator('#address-zip')
        this.txtPhoneNumber = page.locator('#address-phone')
        this.chkDefaultAddress = page.locator('#billing-me +label')
        this.btnSaveAddress = page.locator('button[data-buttonaction="add"]')
        this.btnSaveEditAddress = page.locator('button[data-buttonaction="edit"]')
        this.addressCount = page.locator('.saved-address .card')
        this.editAddressIcon = page.locator('.saved-address .card button.do-edit')
        this.deleteAddressIcon = page.locator('.saved-address .card button.do-delete')
        this.savedAddress_Name = page.locator('.saved-address .card p.name')
        this.savedAddress_StreetName = page.locator('.saved-address .card p.line1')
        this.savedAddress_ApartmentName = page.locator('.saved-address .card p.line2')
        this.savedAddress_City_State = page.locator('.saved-address .card p.city-state')
        this.savedAddress_PhoneNumber = page.locator('.saved-address .card p.phone')
    }


    public async verifyAddressBookDetails(): Promise<void> {
        test.step(`Verify the Address Book Page is loaded`, async () => {
            await this.verifyElementVisibility(this.addressView, { message: 'Address View Element' })
        })
    }

    public async clickAddAddressButton(): Promise<void> {
        test.step(`Clicking Add Address in the address book`, async () => {
            await this.clickElementByMouseCoordinates(this.btnAddAddress, { message: 'Add Address Plus Icon' })
            await this.verifyElementVisibility(this.addAddressPopUp, { message: 'Add Address Modal PopUp' })
        })
    }

    public async enterAddressNickName(nickName: string): Promise<void> {
        await test.step('Entering details in the Nick Name EditBox', async () => {
            await this.enterTextInEditBox(this.txtAddressNickName, nickName, { message: 'Address Nick Name Edit Box' })
        })
    }

    public async enterAddressFirstName(firstName: string): Promise<void> {
        await test.step('Entering details in the First Name EditBox', async () => {
            await this.enterTextInEditBox(this.txtAddressFirstName, firstName, { message: 'First Name Edit Box' })
        })
    }

    public async enterAddressLasttName(lastName: string): Promise<void> {
        await test.step('Entering details in the Last Name EditBox', async () => {
            await this.enterTextInEditBox(this.txtAddressLastName, lastName, { message: 'Last Name Edit Box' })
        })
    }

    public async enterAddressstreetName(streetAddress: string): Promise<void> {
        await test.step('Entering details in the Street Name EditBox', async () => {
            await this.enterTextInEditBox(this.txtAddressstreetName, streetAddress, { message: 'Street Name Edit Box' })
        })
    }

    public async enterAddressApartment(apartmentName: string): Promise<void> {
        await test.step('Entering details in the Apartment Name EditBox', async () => {
            await this.enterTextInEditBox(this.txtAddressApartmentName, apartmentName, { message: 'Apartment Edit Box' })
        })
    }

    public async selectAddressCountryName(countryName: string): Promise<void> {
        await test.step('Select Country Name in Country selection', async () => {
            await this.selectDropDownValue(this.selectAddressCountry, countryName, { message: 'Country Name Selection' })
        })
    }

    public async enterAddressState(stateName: string): Promise<void> {
        await test.step('Entering details in the State Name Selection', async () => {
            await this.selectDropDownValue(this.txtAddressStateName, stateName, { message: 'State Name Selection' })
        })
    }

    public async enterAddressCity(cityName: string): Promise<void> {
        await test.step('Entering details in the City Name EditBox', async () => {
            await this.enterTextInEditBox(this.txtAddressCityName, cityName, { message: 'City Name Edit Box' })
        })
    }

    public async enterAddressPostCode(postCode: string): Promise<void> {
        await test.step('Entering details in the Post Code EditBox', async () => {
            await this.enterTextInEditBox(this.txtAddressPostCode, postCode, { message: 'Post Code Edit Box' })
        })
    }

    public async enterAddressPhoneNumber(phoneNumber: string): Promise<void> {
        await test.step('Entering details in the Phone Number EditBox', async () => {
            await this.enterTextInEditBox(this.txtPhoneNumber, phoneNumber, { message: 'Phone Number Edit Box' })
        })
    }

    public async selectDefaultAddress(): Promise<void> {
        await test.step('Selecting the Default Address Checkbox', async () => {
            await this.clickOn(this.chkDefaultAddress, { message: 'Default Address CheckBox' })
        })
    }

    public async clickSaveAddresss(): Promise<void> {
        await test.step('Clicking Save Address Button', async () => {
            await this.clickOn(this.btnSaveAddress, { message: 'Save Address Button' })
            await this.page.waitForTimeout(3000)
        })
    }

    public async clickSaveEditedAddresss(): Promise<void> {
        await test.step('Clicking Save in Edited Address PopUp', async () => {
            await this.clickOn(this.btnSaveEditAddress, { message: 'Save Address Button in Edited Address PopUp' })
            await this.page.waitForTimeout(3000)
        })
    }

    public async verifySavedAddressCount(counttoVerify: number): Promise<void> {
        await test.step('Verifying the Saved Address Count', async () => {
            await this.verifyElementCount(this.addressCount, counttoVerify, { message: 'Verify Saved Addresses Count' })
        })
    }

    public async deleteExistingAddresses(): Promise<void> {
        const count = await this.getElementsCount(this.addressCount, { message: 'Getting Addresses Count' })
        if (count > 1) {
            for (let i = 0; i < count - 1; i++) {
                await this.deleteAddressIcon.first().click()
                await this.verifyElementVisibility(this.btnDeletePopUp, { message: 'Delete Address Pop Up' })
                await this.page.waitForTimeout(1000)
                await this.page.keyboard.press('Enter')
                await this.page.waitForTimeout(3000)
            }
        }
        await expect(await this.getElementsCount(this.addressCount), { message: 'Verifying all addresses are deleted.' }).toBe(1)
    }

    public async validateSavedAddress(addressNumber: number, name: string, streetName: string, apartmentName: string, state: string, city: string, phoneNumber: string): Promise<void> {
        //Index starts with 0, so addressnumber-1 is used
        await test.step('Validate the Added Address Details', async () => {
            await this.verifyElementText(this.savedAddress_Name.nth(addressNumber - 1), name, { message: 'Saved Address Name' })
            await this.verifyElementText(this.savedAddress_StreetName.nth(addressNumber - 1), streetName, { message: 'Saved Address Street Name' })
            await this.verifyElementText(this.savedAddress_ApartmentName.nth(addressNumber - 1), apartmentName, { message: 'Saved Address Apartment Name' })
            await this.verifyElementText(this.savedAddress_City_State.nth(addressNumber - 1), state, { message: 'Saved Address State Name' })
            await this.verifyElementText(this.savedAddress_City_State.nth(addressNumber - 1), city, { message: 'Saved Address City Name' })
            await this.verifyElementText(this.savedAddress_PhoneNumber.nth(addressNumber - 1), phoneNumber, { message: 'Saved Address Phone Number' })
        })
    }

    public async clickEditIcon(addressNumber: number): Promise<void> {
        //Index starts with 0, so addressnumber-1 is used
        await test.step('Clicking the Edit Icon', async () => {
            await this.clickOn(this.editAddressIcon.nth(addressNumber - 1), { message: 'Address Edit Icon' })
        })
    }

    public async clickDeleteIcon(addressNumber: number): Promise<void> {
        //Index starts with 0, so addressnumber-1 is used
        await test.step('Clicking the Delete Icon', async () => {
            await this.clickOn(this.deleteAddressIcon.nth(addressNumber - 1), { message: 'Address Delete Icon' })
        })
    }

    public async addAddressValidation(nickName: string, firstName: string, lastName: string, streetName: string, apartmentName: string, country: string, state: string, city: string, postCode: string, phoneNumber: string, counttoVerify: number): Promise<void> {
        await test.step('Adding New Address Validation', async () => {
            await this.clickAddAddressButton()
            await this.enterAddressNickName(nickName)
            await this.enterAddressFirstName(firstName)
            await this.enterAddressLasttName(lastName)
            await this.enterAddressstreetName(streetName)
            await this.enterAddressApartment(apartmentName)
            await this.selectAddressCountryName(country)
            await this.enterAddressState(state)
            await this.enterAddressCity(city)
            await this.enterAddressPostCode(postCode)
            await this.enterAddressPhoneNumber(phoneNumber)
            await this.selectDefaultAddress()
            await this.clickSaveAddresss()
            await this.verifySavedAddressCount(counttoVerify)

            //Validate the Saved address here since all the values are passed here directly

            await this.verifyElementText(this.savedAddress_Name.nth(0), firstName + " " + lastName, { message: 'Saved Address Name' })
            await this.verifyElementText(this.savedAddress_StreetName.nth(0), streetName, { message: 'Saved Address Street Name' })
            await this.verifyElementText(this.savedAddress_ApartmentName.nth(0), apartmentName, { message: 'Saved Address Apartment Name' })
            await this.verifyElementText(this.savedAddress_City_State.nth(0), state, { message: 'Saved Address State Name' })
            await this.verifyElementText(this.savedAddress_City_State.nth(0), city, { message: 'Saved Address City Name' })
            await this.verifyElementText(this.savedAddress_PhoneNumber.nth(0), phoneNumber, { message: 'Saved Address Phone Number' })
        })
    }

}