import { Locator } from "@playwright/test";

type LocateBy = Locator | string

export interface IPageActions {
    /**
     * This method is used to launch the application URL.
     *
     * @mandatory_parameters :  
     *         ==> [url] -string- (E.g.) => 'https://gaming-qa-65.logitech.com/en-us/my-account.html'
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
     *              ==> [URLText] -string- (E.g.) => '/en-us/my-account.html'
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
     *              ==> [textToEnter] -string- (E.g.) => 'Test Fname'
     * @optional_parameters :
     *              ==> [message] -string-  (E.g.) => 'First Name Edit Box'
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
     *              ==> [message] -string-  (E.g.) => 'Submit Button'
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
     *              ==> [message] -string-  (E.g.) => 'Order Cancellation Success Message'
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
     *              ==> [message] -string-  (E.g.) => 'Order Cancellation Success Message'
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
     *              ==> [message] -string-  (E.g.) => 'Cancel Order PopUp Text'
     *              ==> [textToVerify] -string- (E.g.) => 'Are you sure you would like to cancel your order?'
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
     *              ==> [textToVerify] -string- (E.g.) => 'Are you sure your order you would like to cancel?'
     * @optional_parameters :
     *              ==> [message] -string-  (E.g.) => 'Cancel Pop Message'
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
     *              ==> [valueToVerify] -string- (E.g.) => 'Testing First Name'
     * @optional_parameters :
     *              ==> [message] -string-  (E.g.) => 'Verifying First Name Edit Box Value'
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
     *              ==> [valueToVerify] -string- (E.g.) => 'Testing First Name'
     * @optional_parameters :
     *              ==> [message] -string-  (E.g.) => 'Verifying First Name Edit Box Value'
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
    *              ==> [message] -string-  (E.g.) => 'Footer email Edit Box'
    * @returnType : void    
    * @author : Web QA Automation Team
    * @since : Dec 2023
    */

    scrollToElement(locateBy: LocateBy, options?: { message: string }): Promise<void>

    /**
    * This method is used to check/uncheck a checkbox.
    *
    * @mandatoryparameters :  
    *              ==> [locateBy]    -Checkbox Object or CheckBox Object Locator- (E.g.) => 'input[type="checkbox"]'
    *              ==> [action]  -string-  (E.g.) => 'check'
    * @optional_parameters :
    *              ==> [message] -string-  (E.g.) => 'Default Address Check Box'
    * @returnType : void    
    * @author : Web QA Automation Team
    * @since : Dec 2023
    */

    checkBoxSelection(locateBy: LocateBy, action: string, options?: { message: string }): Promise<void>

    /**
    * This method is used to get the elements count.
    *
    * @mandatoryparameters :  
    *              ==> [locateBy]    -Any Object or Any Object Locator- (E.g.) => 'footer.main-footer input[type="email"]'
    * @optional_parameters :
    *              ==> [message] -string-  (E.g.) => 'Footer email Edit Box'
    * @returnType : number    
    * @author : Web QA Automation Team
    * @since : Dec 2023
    */

    getElementsCount(locateBy: LocateBy, options?: { message: string }): Promise<number>

    /**
    * This method is used to get the element test.
    *
    * @mandatoryparameters :  
    *              ==> [locateBy]    -Any Object or Any Object Locator- (E.g.) => 'div.email-subscription-success'
    * @optional_parameters :
    *              ==> [message] -string-  (E.g.) => 'Success message'
    * @returnType : string    
    * @author : Web QA Automation Team
    * @since : Dec 2023
    */

    getElementText(locateBy: LocateBy, options?: { message: string }): Promise<string>

    /**
    * This method is used to get the elements count and compare the count displayed.
    *
    * @mandatoryparameters :  
    *              ==> [locateBy]    -Any Object or Any Object Locator- (E.g.) => 'button[name="email-subscription-submit"]'
    *              ==> [countToVerify] -number- (E.g.) => 20
    * @optional_parameters :         
    *              ==> [message] -string-  (E.g.) => 'Submit Button'
    * @returnType : void
    * @author : Web QA Automation Team
    * @since : Dec 2023
    */

    verifyElementCount(locateBy: LocateBy, countToVerify: number, options?: { message: string }): Promise<void>

    /**
    * This method is used to get any element attribute value and compare the run time attribute value.
    *
    * @mandatoryparameters :  
    *              ==> [locateBy]    -Any Object or Any Object Locator- (E.g.) => 'a.js-checkout-btn'
    *              ==> [attributeName] -string- (E.g.) => 'data-analytics-title'
    *              ==> [attributevalue] -string- (E.g.) => 'add-to-cart'
    * @optional_parameters :           
    *              ==> [message] -string-  (E.g.) => 'Add To Cart Button'
    * @returnType : void
    * @author : Web QA Automation Team
    * @since : Dec 2023
    */

    verifyAttributeValue(locateBy: LocateBy, attributeName: string, attributevalue: string, options?: { message: string }): Promise<void>

    /**
    * This method is used to press any keybord keys.
    *
    * @mandatoryparameters :  
    *              ==> [key]    -string- (E.g.) => 'Enter'          
    * @optional_parameters :
    *              ==> [message] -string-  (E.g.) => 'Pressing Enter Key'
    * @returnType : void
    * @author : Web QA Automation Team
    * @since : Dec 2023
    */

    keyboardKeyPress(key: string, options?: { message: string }): Promise<void>

    /**
    * This method is used to select any dropdown value from any particular dropdown.
    *
    * @mandatoryparameters :  
    *              ==> [locateBy]    -Any Object or Any Object Locator- (E.g.) => 'select#profile-country'
    *              ==> [text] -string- (E.g.) => 'Australia'
    * @optional_parameters :           
    *              ==> [message] -string-  (E.g.) => 'Country Selection Drop Down'
    * @returnType : void
    * @author : Web QA Automation Team
    * @since : Dec 2023
    */

    selectDropDownValue(locateBy: LocateBy, text: string, options?: { message: string }): Promise<void>

    /**
    * This method is used to validate the selected dropdown value from any particular dropdown.
    *
    * @mandatoryparameters :  
    *              ==> [selectDropDownLocator]    -locator string- (E.g.) => 'select#profile-country'
    *              ==> [textToVerify] -string- (E.g.) => 'Australia'
    * @optional_parameters :           
    *              ==> [message] -string-  (E.g.) => 'Verify selected Country'
    * @returnType : void
    * @author : Web QA Automation Team
    * @since : Dec 2023
    */

    verifySelectedDropDownValue(selectDropDownLocator: string, textToVerify: string, options?: { message: string }): Promise<void>

    /**
    * This method is used to verify the status received is true.
    *
    * @mandatoryparameters :  
    *              ==> [status]    -boolean- (E.g.) => 'true'
    * @optional_parameters :           
    *              ==> [message] -string-  (E.g.) => 'Value to be true'
    * @returnType : void
    * @author : Web QA Automation Team
    * @since : Dec 2023
    */

    expectToBeTrue(status: boolean, options?: { message: string }): Promise<void>

    /**
    * This method is used to click any element using mouse co-ordinates.
    *
    * @mandatoryparameters :  
    *              ==> [selector]    -locator string- (E.g.) => 'select#profile-country'
    * @optional_parameters :           
    *              ==> [message] -string-  (E.g.) => 'Delete Icon'
    * @returnType : void
    * @author : Web QA Automation Team
    * @since : Dec 2023
    */

    clickElementByMouseCoordinates(selector: string, options?: { message: string }): Promise<void>

    /**
    * This method is used to get files count and return the count value.
    *
    * @mandatoryparameters :  
    *              ==> [folderPath]    -Any folder path- (E.g.) => 'downloads/TC01'
    * @optional_parameters : Nil
    * @returnType : number
    * @author : Web QA Automation Team
    * @since : Dec 2023
    */

    getFilesCount(folderPath: string): Promise<number>

    /**
    * This method is used to get files count and compare the count value passed.
    *
    * @mandatoryparameters :  
    *              ==> [folderPath]    -Any folder path- (E.g.) => 'downloads/TC01'
    *              ==> [count] -number- (E.g.) => 5
    * @optional_parameters :
    *              ==> [message] -string-  (E.g.) => 'Verifying files count'
    * @returnType : void
    * @author : Web QA Automation Team
    * @since : Dec 2023
    */

    verifyFilesCount(folderPath: string, count: number, options?: { message: string }): Promise<void>

    /**
    * This method is used to delete all the files in a folder.
    *
    * @mandatoryparameters :  
    *              ==> [folderPath]    -Any folder path- (E.g.) => 'downloads/TC01'
    * @optional_parameters :
    *              ==> [message] -string-  (E.g.) => 'Delete files from the folder'
    * @returnType : number
    * @author : Web QA Automation Team
    * @since : Dec 2023
    */

    deleteAllFilesInDir(dirPath, options?: { message: string }): Promise<void>
}