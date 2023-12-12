import { Page, test, Locator, expect, ElementHandle } from '@playwright/test'
import { IPageActions } from '../../PageObjectsGuide/PageActions'
import * as fs from 'fs/promises';
import * as path from 'path';

type LocateBy = Locator | string

export class BasePage implements IPageActions {

    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    //Construct an element based on locator passed

    constructElementBasedOnLocator(locateBy: string) {
        return this.page.locator(locateBy)
    }

    generateElement(locateBy: LocateBy) {
        return typeof (locateBy) === 'string' ? this.constructElementBasedOnLocator(locateBy) : locateBy
    }

    async launchURL(url: string): Promise<void> {
        await test.step('Launching the application URL', async () => {
            try {
                await this.page.goto(url)
            } catch (err) {
                throw new Error(`Exception occured while launching the URL ${url} [Error Details: ${err}]`)
            }
        })
    }

    async verifyPageURL(URLText: string): Promise<void> {
        await test.step('Verify the launched URL', async () => {
            try {
                await expect(this.page.url()).toContain(URLText);
            } catch (err) {
                throw new Error(`Exception occured while verifying the launched page URL with URL Text ${URLText} [Error Details: ${err}]`)
            }
        })
    }

    async enterTextInEditBox(locateBy: LocateBy, textToEnter: string, options?: { message: string }): Promise<void> {
        await test.step(`Enterting value in an editbox ${options?.message}`, async () => {
            try {
                await this.generateElement(locateBy).clear()
                await this.generateElement(locateBy).fill(textToEnter)
            } catch (err) {
                throw new Error(`Exception occured while entering text ${textToEnter} in the Edit Box [Error Details: ${err}]`)
            }
        })
    }

    async clickOn(locateBy: LocateBy, options?: { message: string }): Promise<void> {
        await test.step(`Clicking the element ${options?.message}`, async () => {
            try {
                await this.generateElement(locateBy).click()
            } catch (err) {
                throw new Error(`Exception occured while clicking the button [Error Details: ${err}]`)
            }
        })
    }

    async verifyElementVisibility(locateBy: LocateBy, options?: { message: string }): Promise<void> {
        await test.step(`Visibility of the element ${options?.message}`, async () => {
            try {
                await expect(this.generateElement(locateBy)).toBeVisible({ timeout: 30000 })
            } catch (err) {
                throw new Error(`Exception occured while verifying the element visibility [Error Details: ${err}]`)
            }
        })
    }

    async verifyElementNotPresent(locateBy: LocateBy, options?: { message: string }): Promise<void> {
        await test.step(`Visibility of the element ${options?.message}`, async () => {
            try {
                await expect(this.generateElement(locateBy)).not.toBeVisible({ timeout: 30000 })
            } catch (err) {
                throw new Error(`Exception occured while verifying the element visibility [Error Details: ${err}]`)
            }
        })
    }

    async waitForElementAttached(locator: string): Promise<void> {
        await test.step(`Wait for element existence with locator passed`, async () => {
            try {
                await this.page.waitForSelector(locator)
            } catch (err) {
                throw new Error(`Exception occured while verifying the element existence with locator passed: ${locator} [Error Details: ${err}]`)
            }
        })
    }

    async verifyElementText(locateBy: LocateBy, textToVerify: string, options?: { message: string }): Promise<void> {
        await test.step(`Verify the text of the element ${options?.message}`, async () => {
            try {
                await expect(this.generateElement(locateBy)).toContainText(textToVerify)
            } catch (err) {
                throw new Error(`Exception occured while verifying the element Text [Error Details: ${err}]`)
            }
        })
    }

    async verifyElementTextNotPresent(locateBy: LocateBy, textToVerify: string, options?: { message: string }): Promise<void> {
        await test.step(`Verify the text Not Present in the element ${options?.message}`, async () => {
            try {
                await expect(this.generateElement(locateBy)).not.toContainText(textToVerify)
            } catch (err) {
                throw new Error(`Exception occured while verifying the element Text [Error Details: ${err}]`)
            }
        })
    }

    async verifyEditboxValue(locateBy: LocateBy, valueToVerify: string, options?: { message: string }): Promise<void> {
        await test.step(`Verify the text of the element ${options?.message}`, async () => {
            try {
                await expect(this.generateElement(locateBy)).toHaveValue(valueToVerify)
            } catch (err) {
                throw new Error(`Exception occured while verifying the Edit Box value [Error Details: ${err}]`)
            }
        })
    }

    async verifyEditboxValueNotPresent(locateBy: LocateBy, valueToVerify: string, options?: { message: string }): Promise<void> {
        await test.step(`Verify the text of the element ${options?.message}`, async () => {
            try {
                await expect(this.generateElement(locateBy)).not.toHaveValue(valueToVerify)
            } catch (err) {
                throw new Error(`Exception occured while verifying the Edit Box value [Error Details: ${err}]`)
            }
        })
    }

    async scrollToElement(locateBy: LocateBy, options?: { message: string }): Promise<void> {
        await test.step(`Scrolling to the element ${options?.message}`, async () => {
            try {
                await this.generateElement(locateBy).scrollIntoViewIfNeeded()
            } catch (err) {
                throw new Error(`Exception occured while scrolling to the element [Error Details: ${err}]`)
            }
        })
    }

    async checkBoxSelection(locateBy: LocateBy, action: string, options?: { message: string }): Promise<void> {
        await test.step(`Check Box Selection for the element ${options?.message}`, async () => {
            try {
                if (action.toLowerCase() === 'check') {
                    await this.generateElement(locateBy).check({ 'force': true })
                } else {
                    await this.generateElement(locateBy).uncheck({ 'force': true })
                }
            } catch (err) {
                throw new Error(`Exception occured while checking the Checkbox [Error Details: ${err}]`)
            }
        })
    }

    async getElementsCount(locateBy: LocateBy, options?: { message: string }): Promise<number> {
        let count = 0
        await test.step(`Returning the element ${options?.message} count`, async () => {
            try {
                await this.generateElement(locateBy).first().waitFor({ timeout: 5000 })
                count = await this.generateElement(locateBy).count()
            } catch (err) {
                throw new Error(`Exception occured while getting the count of elements [Error Details: ${err}]`)
            }
        })
        return count
    }

    async getElementText(locateBy: LocateBy, options?: { message: string }): Promise<string> {
        let eleText
        await test.step(`Returning the element Text ${options?.message}`, async () => {
            try {
                eleText = await this.generateElement(locateBy).textContent()
            } catch (err) {
                throw new Error(`Exception occured while getting the count of elements [Error Details: ${err}]`)
            }
        })
        return eleText
    }

    async verifyElementCount(locateBy: LocateBy, countToVerify: number, options?: { message: string }): Promise<void> {
        await test.step(`Verify the element ${options?.message} count`, async () => {
            try {
                await this.generateElement(locateBy).first().waitFor()
                const count = await this.generateElement(locateBy).count()
                await expect(count).toEqual(countToVerify)
            } catch (err) {
                throw new Error(`Exception occured while verifying elements count [Error Details: ${err}]`)
            }
        })
    }

    async verifyAttributeValue(locateBy: LocateBy, attributeName: string, attributevalue: string, options?: { message: string }): Promise<void> {
        await test.step(`Verify the element ${options?.message} attribute and attribute value`, async () => {
            try {
                await expect(this.generateElement(locateBy)).toHaveAttribute(attributeName, attributevalue);
            } catch (err) {
                throw new Error(`Exception occured while verifying the attribute value [Error Details: ${err}]`)
            }
        })
    }

    async keyboardKeyPress(key: string, options?: { message: string }): Promise<void> {
        await test.step(`Pressing the ${key} in the page ${options?.message}`, async () => {
            try {
                await this.page.keyboard.press(key)
            } catch (err) {
                throw new Error(`Exception occured while pressing the key: ${key} in the page ${options?.message} [Error Details: ${err}]`)
            }
        })
    }

    async selectDropDownValue(locateBy: LocateBy, text: string, options?: { message: string }): Promise<void> {
        await test.step(`Selecting the value ${text} from the dropdown`, async () => {
            try {
                await this.generateElement(locateBy).selectOption({ label: text })
            } catch (err) {
                throw new Error(`Exception occured while selecting the dropdown value in the dropdown ${options?.message} [Error Details: ${err}]`)
            }
        })
    }

    async verifySelectedDropDownValue(selectDropDownLocator: string, textToVerify: string, options?: { message: string }): Promise<void> {
        await test.step(`Selecting the value ${textToVerify} from the dropdown`, async () => {
            try {
                expect(await this.page.$eval<string, HTMLSelectElement>(selectDropDownLocator, ele => ele.value)).toBe(textToVerify)
            } catch (err) {
                throw new Error(`Exception occured while selecting the dropdown value in the dropdown ${options?.message} [Error Details: ${err}]`)
            }
        })
    }

    async expectToBeTrue(status: boolean, options?: { message: string }): Promise<void> {
        try {
            expect(status, options?.message).toBe(true);
        }
        catch (err) {
            throw new Error(`Exception occured while validating the true status ${err}`);
        }
    }

    async clickElementByMouseCoordinates(selector: string, options?: { message: string }): Promise<void> {
        await test.step(`Clicking the element ${options?.message}`, async () => {
            await this.page.waitForTimeout(5000)
            const elementHandles = await this.page.$$(selector)

            if (!elementHandles) {
                throw new Error(`Exception occured while identifying the element`);
            }
            const boundingBox = await elementHandles[0].boundingBox()
            if (!boundingBox) {
                throw new Error(`Exception occured while verifying the element visibility`);
            }
            const x = boundingBox.x + boundingBox.width / 2
            const y = boundingBox.y + boundingBox.height / 2

            await this.page.mouse.click(x, y)
        })
    }


    async getFilesCount(folderPath: string): Promise<number> {
        let count = 0
        try {
            const files = await fs.readdir(folderPath)
            count = files.length
        } catch (err) {
            throw new Error(`Exception occured while getting the file count ${err}`);
        }
        return count
    }

    async verifyFilesCount(folderPath: string, count: number, options?: { message: string }): Promise<void> {
        await test.step(`Verifying the files count`, async () => {
            try {
                let fileCount = await this.getFilesCount(folderPath)
                await expect(fileCount, { 'message': `Files count ${fileCount} in Downloads folder to match with expected value is ${count}` }).toBe(count)
            } catch (err) {
                throw new Error(`Exception occured validating the file count for ${options?.message} ${err}`);
            }
        })
    }
}
