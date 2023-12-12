import { Locator } from "@playwright/test";

type LocateBy = Locator | string

export interface IPageActions {
    /**
     * This method is used to launch the application URL.
     *
     * @mandatory_parameters :  
     *         ==> [url] -String- (E.g.) => 'https://gaming-qa-65.logitech.com/en-us/my-account.html'
     * @optional_parameters : Nil
     * @returnType : void
     * @author : Web QA Automation Team
     * @since : Dec 2023
     */

    launchURL(url: string): Promise<void>

    /**
     * This method is used to verify the launched application URL contains the text passed.
     *
     * @mandatoryparameter :  
     *              ==> [URLText] -String- (E.g.) => '/en-us/my-account.html'
     * @optional_parameters : Nil
     * @returnType : void
     * @author : Web QA Automation Team
     * @since : Dec 2023
     */

    verifyPageURL(URLText: string): Promise<void>

    /**
     * This method is used to enter the value in an editbox.
     *
     * @mandatoryparameters :  
     *              ==> [locateBy]    -TextBox Object or TextBox Locator- (E.g.) => '#address-firstname'
     *              ==> [textToEnter] -String- (E.g.) => 'Test Fname'
     * @optional_parameters :
     *              ==> [message] -String-  (E.g.) => 'First Name Edit Box'
     * @returnType : void
     * @author : Web QA Automation Team
     * @since : Dec 2023
     */

    enterTextInEditBox(locateBy: LocateBy, textToEnter: string, options?: { message: string }): Promise<void>

    /**
     * This method is used to click any element (button/link).
     *
     * @mandatoryparameters :  
     *              ==> [locateBy]    -Button/Link Object or Button/Link Locator- (E.g.) => 'button[data-buttonaction="add"]'
     * @optional_parameters :
     *              ==> [message] -String-  (E.g.) => 'Submit Button'
     * @returnType : void
     * @author : Web QA Automation Team
     * @since : Dec 2023
     */

    clickOn(locateBy: LocateBy, options?: { message: string }): Promise<void>

    /**
     * This method is used to verify the visibility of any element.
     *
     * @mandatoryparameters :  
     *              ==> [locateBy]    -Any Object or Any Object Locator- (E.g.) => 'div.success-message'
     * @optional_parameters :
     *              ==> [message] -String-  (E.g.) => 'Order Cancellation Success Message'
     *              ==> [timeout] -Number-  (E.g.) => 5000 
     * Note: Default Timeout will be 30 secs (30000)
     * @returnType : void
     * @author : Web QA Automation Team
     * @since : Dec 2023
     */

    verifyElementVisibility(locateBy: LocateBy, options?: { message: string }, timeout?: number): Promise<void>

    /**
     * This method is used to verify the element not displayed in the page.
     *
     * @mandatoryparameters :  
     *              ==> [locateBy]    -Any Object or Any Object Locator- (E.g.) => 'div.success-message'
     * @optional_parameters :
     *              ==> [message] -String-  (E.g.) => 'Order Cancellation Success Message'
     *              ==> [timeout] -Number-  (E.g.) => 5000 
     * Note: Default Timeout will be 30 secs (30000)
     * @returnType : void
     * @author : Web QA Automation Team
     * @since : Dec 2023
     */

    verifyElementNotPresent(locateBy: LocateBy, options?: { message: string }): Promise<void>

    /**
     * This method is used to verify the element is attached to DOM but not the element visibility.
     *
     * @mandatoryparameters :  
     *              ==> [locateBy]    -Any Object or Any Object Locator- (E.g.) => 'div#shippingAddress'
     * @optional_parameters : Nil
     * @returnType : void
     * @author : Web QA Automation Team
     * @since : Dec 2023
     */

    waitForElementAttached(locator: string): Promise<void>

    /**
     * This method is used to verify the element text displayed is matching with the expected text.
     *
     * @mandatoryparameters :  
     *              ==> [locateBy]    -Any Object or Any Object Locator- (E.g.) => 'div.cancel-order-modal div.order-cancel p'
     * @optional_parameters :
     *              ==> [message] -String-  (E.g.) => 'Cancel Order PopUp Text'
     *              ==> [textToVerify] -String- (E.g.) => 'Are you sure you would like to cancel your order?'
     * @returnType : void
     * @author : Web QA Automation Team
     * @since : Dec 2023
     */

    verifyElementText(locateBy: LocateBy, textToVerify: string, options?: { message: string }): Promise<void>

    /**
     * This method is used to verify the element text displayed is not-matching with the text passed as parameter.
     *
     * @mandatoryparameters :  
     *              ==> [locateBy]    -Any Object or Any Object Locator- (E.g.) => 'div.cancel-order-modal div.order-cancel p'
     *              ==> [textToVerify] -String- (E.g.) => 'Are you sure your order you would like to cancel?'
     * @optional_parameters :
     *              ==> [message] -String-  (E.g.) => 'Cancel Pop Message'
     * @returnType : void
     * @author : Web QA Automation Team
     * @since : Dec 2023
     */

    verifyElementTextNotPresent(locateBy: LocateBy, textToVerify: string, options?: { message: string }): Promise<void>

    /**
     * This method is used to verify the text displayed especially in a text box to match with the expected text.
     *
     * @mandatoryparameters :  
     *              ==> [locateBy]    -Any Object or Any Object Locator- (E.g.) => 'input[name*="first_name"]'
     *              ==> [valueToVerify] -String- (E.g.) => 'Testing First Name'
     * @optional_parameters :
     *              ==> [message] -String-  (E.g.) => 'Verifying First Name Edit Box Value'
     * @returnType : void       
     * @author : Web QA Automation Team
     * @since : Dec 2023
     */

    verifyEditboxValue(locateBy: LocateBy, valueToVerify: string, options?: { message: string }): Promise<void>

    /**
     * This method is used to verify the text displayed especially in a text box is not matching with the expected text.
     *
     * @mandatoryparameters :  
     *              ==> [locateBy]    -Any Object or Any Object Locator- (E.g.) => 'input[name*="first_name"]'
     *              ==> [valueToVerify] -String- (E.g.) => 'Testing First Name'
     * @optional_parameters :
     *              ==> [message] -String-  (E.g.) => 'Verifying First Name Edit Box Value'
     * Note: Generally used for cancel button click to make sure the value is not getting saved
     * @returnType : void          
     * @author : Web QA Automation Team
     * @since : Dec 2023
     */

    verifyEditboxValueNotPresent(locateBy: LocateBy, valueToVerify: string, options?: { message: string }): Promise<void>

    /**
    * This method is used to scroll to a specific element.
    *
    * @mandatoryparameters :  
    *              ==> [locateBy]    -Any Object or Any Object Locator- (E.g.) => 'footer.main-footer input[type="email"]'
    * @optional_parameters :
    *              ==> [message] -String-  (E.g.) => 'Footer email Edit Box'
    * @returnType : void    
    * @author : Web QA Automation Team
    * @since : Dec 2023
    */

    scrollToElement(locateBy: LocateBy, options?: { message: string }): Promise<void>

    checkBoxSelection(locateBy: LocateBy, action: string, options?: { message: string }): Promise<void>
    getElementsCount(locateBy: LocateBy, options?: { message: string }): Promise<number>
    getElementText(locateBy: LocateBy, options?: { message: string }): Promise<any>
    verifyElementCount(locateBy: LocateBy, countToVerify: number, options?: { message: string }): Promise<void>
    verifyAttributeValue(locateBy: string | Locator, attributeName: string, attributevalue: string, options?: { message: string }): Promise<void>
    keyboardKeyPress(key: string, options?: { message: string }): Promise<void>
    selectDropDownValue(locateBy: LocateBy, text: string, options?: { message: string }): Promise<void>
    verifySelectedDropDownValue(selectDropDownLocator: string, textToVerify: string, options?: { message: string }): Promise<void>
    expectToBeTrue(status: boolean, options?: { message: string }): Promise<void>
    clickElementByMouseCoordinates(selector: string, options?: { message: string }): Promise<void>
    getFilesCount(folderPath: string): Promise<number>
    verifyFilesCount(folderPath: string, count: number, options?: { message: string }): Promise<void>
}