import { expect, Locator, Page, test } from "@playwright/test";
import { BasePage } from "./basePage";


export class AddressPage extends BasePage {

    private readonly addressView: Locator
    private readonly addAddressPopUp: Locator
    private readonly txtAddressNickName: Locator
    private readonly txtAddressFirstName: Locator
    private readonly txtAddressLastName: Locator
    private readonly txtAddresstreetName: Locator
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
    private readonly btnDelete: Locator
    private readonly savedAddress_Name: Locator
    private readonly savedAddress_StreetName: Locator
    private readonly savedAddress_ApartmentName: Locator
    private readonly savedAddress_City_State: Locator
    private readonly savedAddress_PhoneNumber: Locator
    private readonly fieldErrorMsg: Locator
    private readonly btnCloseModalPopUp: Locator
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
        this.txtAddresstreetName = page.locator('#address-street')
        this.txtAddressApartmentName = page.locator('#address-apartment')
        this.selectAddressCountry = page.locator('select#address-country')
        this.txtAddressStateName = page.locator('select#address-state')
        this.txtAddressCityName = page.locator('#address-city')
        this.txtAddressPostCode = page.locator('#address-zip')
        this.txtPhoneNumber = page.locator('#address-phone')
        this.chkDefaultAddress = page.locator('#billing-me +label')
        this.btnSaveAddress = page.locator('button[data-buttonaction="add"]').nth(0)
        this.btnSaveEditAddress = page.locator('button[data-buttonaction="edit"]').nth(0)
        this.addressCount = page.locator('.saved-address .card')
        this.editAddressIcon = page.locator('.saved-address .card button.do-edit')
        this.deleteAddressIcon = page.locator('.saved-address .card button.do-delete')
        this.btnDelete = page.locator('button.btn.btn-error').nth(0)
        this.savedAddress_Name = page.locator('.saved-address .card p.name')
        this.savedAddress_StreetName = page.locator('.saved-address .card p.line1')
        this.savedAddress_ApartmentName = page.locator('.saved-address .card p.line2')
        this.savedAddress_City_State = page.locator('.saved-address .card p.city-state')
        this.savedAddress_PhoneNumber = page.locator('.saved-address .card p.phone')
        this.fieldErrorMsg = page.locator('p.error')
        this.btnCloseModalPopUp = page.locator('#address-modal button.component-modal-close')
    }


    public async verifyAddressBookDetails(): Promise<void> {
        await test.step(`Verify the Address Book Page is loaded`, async () => {
            await this.verifyElementVisibility(this.addressView, { message: 'Address View Element' })
        })
    }

    public async clickAddAddressButton(): Promise<void> {
        await test.step(`Clicking Add Address in the address book`, async () => {
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

    public async enterAddresstreetName(streetAddress: string): Promise<void> {
        await test.step('Entering details in the Street Name EditBox', async () => {
            await this.enterTextInEditBox(this.txtAddresstreetName, streetAddress, { message: 'Street Name Edit Box' })
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

    public async clickSaveAddress(): Promise<void> {
        await test.step('Clicking Save Address Button', async () => {
            await this.clickOn(this.btnSaveAddress, { message: 'Save Address Button' })
            await this.page.waitForTimeout(3000)
        })
    }

    public async clickSaveEditedAddress(): Promise<void> {
        await test.step('Clicking Save in Edited Address PopUp', async () => {
            await this.clickOn(this.btnSaveEditAddress, { message: 'Save Address Button in Edited Address PopUp' })
            await this.page.waitForTimeout(5000)
        })
    }

    public async verifySavedAddressCount(counttoVerify: number | undefined): Promise<void> {
        if (counttoVerify) {
            await test.step('Verifying the Saved Address Count', async () => {
                await this.verifyElementCount(this.addressCount, counttoVerify, { message: 'Verify Saved Addresses Count' })
            })
        }
    }

    public async validateFieldErrorMessage(fieldMsg: string): Promise<void> {
        await test.step('Verify the field level Error message', async () => {
            await this.verifyElementText(this.fieldErrorMsg, fieldMsg, { message: fieldMsg })
        })
    }

    public async clickCloseSaveAddressPopUp(): Promise<void> {
        await test.step('Clicking Close button in PopUp', async () => {
            await this.clickOn(this.btnCloseModalPopUp, { message: 'Clicking Close button in PopUp' })
            await this.page.waitForTimeout(5000)
        })
    }

    public async deleteExistingAddresses(): Promise<void> {
        const count = await this.getElementsCount(this.addressCount, { message: 'Getting Addresses Count' })
        if (count > 1) {
            for (let i = 0; i < count - 1; i++) {
                await this.deleteAddressIcon.first().click()
                await this.verifyElementVisibility(this.btnDeletePopUp, { message: 'Delete Address Pop Up' })
                await this.page.waitForTimeout(1000)
                await this.clickElementByMouseCoordinates('button.btn.btn-error')
                await this.page.waitForTimeout(3000)
                await this.page.reload()
            }
        }
        await this.page.waitForTimeout(3000)
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

    public async addAddressValidation(nickName: string, firstName: string, lastName: string, streetName: string, apartmentName: string, country: string, state: string, city: string, postCode: string, phoneNumber: string, options?: { counttoVerify: number | undefined }): Promise<void> {
        await test.step('Adding New Address Validation', async () => {
            await this.clickAddAddressButton()
            await this.enterAddressNickName(nickName)
            await this.enterAddressFirstName(firstName)
            await this.enterAddressLasttName(lastName)
            await this.enterAddresstreetName(streetName)
            await this.enterAddressApartment(apartmentName)
            await this.selectAddressCountryName(country)
            await this.enterAddressState(state)
            await this.enterAddressCity(city)
            await this.enterAddressPostCode(postCode)
            await this.enterAddressPhoneNumber(phoneNumber)
            await this.selectDefaultAddress()
            await this.clickSaveAddress()
            await this.verifySavedAddressCount(options?.counttoVerify)

            //Validate the Saved address here since all the values are passed here directly

            await this.verifyElementText(this.savedAddress_Name.nth(0), firstName + " " + lastName, { message: 'Saved Address Name' })
            await this.verifyElementText(this.savedAddress_StreetName.nth(0), streetName, { message: 'Saved Address Street Name' })
            await this.verifyElementText(this.savedAddress_ApartmentName.nth(0), apartmentName, { message: 'Saved Address Apartment Name' })
            await this.verifyElementText(this.savedAddress_City_State.nth(0), state, { message: 'Saved Address State Name' })
            await this.verifyElementText(this.savedAddress_City_State.nth(0), city, { message: 'Saved Address City Name' })
            await this.verifyElementText(this.savedAddress_PhoneNumber.nth(0), phoneNumber, { message: 'Saved Address Phone Number' })
        })
    }

    public async addressFieldsValidationAdd(): Promise<void> {
        await test.step('Address Field Validations on clicking Add Button', async () => {
            await this.clickAddAddressButton()

            await this.enterAddressNickName('test nickname')
            await this.enterAddressFirstName('testingfiftycharacterslimittestingfiftycharacterslimit')
            await this.verifyEditboxValue(this.txtAddressFirstName, 'testingfiftycharacterslimittestingfiftycharactersl', { 'message': 'First Name Character Limit' })

            await this.enterAddressLasttName('testingfiftycharacterslimittestingfiftycharacterslimit')
            await this.verifyEditboxValue(this.txtAddressLastName, 'testingfiftycharacterslimittestingfiftycharactersl', { 'message': 'Last Name Character Limit' })

            await this.enterAddresstreetName('testingfiftycharacterslimittestingfiftycharacterslimit')
            await this.verifyEditboxValue(this.txtAddresstreetName, 'testingfiftycharacterslimittestingfiftycharactersl', { 'message': 'Street Character Limit' })

            await this.enterAddressApartment('1')
            await this.selectAddressCountryName('United States')

            await this.enterAddressCity('testingfiftycharacterslimittestingfiftycharacterslimit')
            await this.verifyEditboxValue(this.txtAddressCityName, 'testingfiftycharacterslimittestingfiftycharactersl', { 'message': 'Street Character Limit' })

            await this.enterAddressPostCode('123456789')
            await this.enterAddressPhoneNumber('8177174886')
            await this.clickSaveAddress()

            //To verify the Required State field
            await this.validateFieldErrorMessage('Please provide your state, province, or region')
            await this.enterAddressState('Texas')

            //To verify the number of characters in City field is between 2 and 50
            await this.enterAddressCity('c')
            await this.clickSaveAddress()
            await this.validateFieldErrorMessage('Between 2 to 50 characters are required.')
            await this.enterAddressCity('Fort Worth')

            //To verify the Post Code field validations
            await this.enterAddressPostCode('AEMTH-2323')
            await this.clickSaveAddress()
            await this.validateFieldErrorMessage('Please enter a valid zip code')

            //To verify entering more than 10 characters in Post code
            await this.enterAddressPostCode('1234567890012345')
            await this.verifyEditboxValue(this.txtAddressPostCode, '1234567890', { 'message': 'Post Code Address Limit' })


            //To check for Australia
            await this.selectAddressCountryName('Australia')
            await this.enterAddressState('North South Wales')
            await this.clickSaveAddress()
            await this.validateFieldErrorMessage('Please enter a valid zip code')

            await this.enterAddressPostCode('2410')
            await this.clickSaveAddress()
        })
    }

    public async addressFieldsValidationEdit(): Promise<void> {
        await test.step('Address Fields Validation on clicking Edit Button', async () => {
            await this.clickEditIcon(1)

            await this.enterAddressNickName('test nickname')
            await this.enterAddressFirstName('testingfiftycharacterslimittestingfiftycharacterslimit')
            await this.verifyEditboxValue(this.txtAddressFirstName, 'testingfiftycharacterslimittestingfiftycharactersl', { 'message': 'First Name Character Limit' })

            await this.enterAddressLasttName('testingfiftycharacterslimittestingfiftycharacterslimit')
            await this.verifyEditboxValue(this.txtAddressLastName, 'testingfiftycharacterslimittestingfiftycharactersl', { 'message': 'Last Name Character Limit' })

            await this.enterAddresstreetName('testingfiftycharacterslimittestingfiftycharacterslimit')
            await this.verifyEditboxValue(this.txtAddresstreetName, 'testingfiftycharacterslimittestingfiftycharactersl', { 'message': 'Street Character Limit' })

            await this.enterAddressApartment('1')
            await this.selectAddressCountryName('United States')

            await this.enterAddressCity('testingfiftycharacterslimittestingfiftycharacterslimit')
            await this.verifyEditboxValue(this.txtAddressCityName, 'testingfiftycharacterslimittestingfiftycharactersl', { 'message': 'Street Character Limit' })

            await this.enterAddressPostCode('123456789')
            await this.enterAddressPhoneNumber('8177174886')
            await this.clickSaveEditedAddress()

            //To verify the Required State field
            await this.validateFieldErrorMessage('Please provide your state, province, or region')
            await this.enterAddressState('Texas')

            //To verify the number of characters in City field is between 2 and 50
            await this.enterAddressCity('c')
            await this.clickSaveEditedAddress()
            await this.validateFieldErrorMessage('Between 2 to 50 characters are required.')
            await this.enterAddressCity('Fort Worth')

            //To verify the Post Code field validations
            await this.enterAddressPostCode('AEMTH-2323')
            await this.clickSaveEditedAddress()
            await this.validateFieldErrorMessage('Please enter a valid zip code')

            //To verify entering more than 10 characters in Post code
            await this.enterAddressPostCode('1234567890012345')
            await this.verifyEditboxValue(this.txtAddressPostCode, '1234567890', { 'message': 'Post Code Address Limit' })


            //To check for Australia
            await this.selectAddressCountryName('Australia')
            await this.enterAddressState('North South Wales')
            await this.clickSaveEditedAddress()
            await this.validateFieldErrorMessage('Please enter a valid zip code')

            await this.enterAddressPostCode('2410')
            await this.clickSaveEditedAddress()
        })
    }
}