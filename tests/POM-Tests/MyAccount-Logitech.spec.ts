import { test } from '@playwright/test'
import { LoginPage } from '../../PageObjects/Pages/loginPage'
import { HomePage } from '../../PageObjects/Pages/homePage'
import { PLPPage } from '../../PageObjects/Pages/PLPPage'
import { CheckoutPage } from '../../PageObjects/Pages/checkoutPage'
import { OrderStatusPage } from '../../PageObjects/Pages/orderStatusPage'
import { OrderDetailsPage } from '../../PageObjects/Pages/orderDetailsPage'
import { EmailPreferencesPage } from '../../PageObjects/Pages/emailPreferencesPage'
import { PaymentOptionsPage } from '../../PageObjects/Pages/paymentOptionsPage'
import { EditProfilePage } from '../../PageObjects/Pages/editProfilePage'
import { AddressPage } from '../../PageObjects/Pages/addressPage'
import { MyOrdersPage } from '../../PageObjects/Pages/myOrdersPage'
import { InvoicePage } from '../../PageObjects/Pages/invoicePage'
import * as globalData from '../../testdata/globalTestData.json'
import * as environmentDetails from '../../playwright.env.json'

var brandName: string = "Logitech"
let brandDetails: any = globalData.brandDetails
let env: string = environmentDetails.environment
let baseURL = brandDetails[env][brandName]


test.describe(`MyAccount : Non-Logged-In User Generic Test Cases executed in ${env} environment`, async () => {
    test(`📃 TC001 - Login Form : Ensure the presence of every sections in Home Page and Login Form Display`, async ({ page }) => {
        await test.step('Ensure the presence of every sections in Home Page and Login Form Display', async () => {
            await page.goto(baseURL + '/en-us/my-account.html')
            const homePage = new HomePage(page)
            await homePage.validateHomeButtons()
            await homePage.validateAllSectionsLogi(env)
            await homePage.clickhomePageLoginButton()
        })
    })

    test(`📃 TC001.1 - Create Account Form : Ensure the presence of every sections in Home Page and Create Account Form Display`, async ({ page }) => {
        await test.step('Ensure the presence of every sections in Home Page and Create An Account Form Display', async () => {
            await page.goto(baseURL + '/en-us/my-account.html')
            const homePage = new HomePage(page)
            await homePage.validateHomeButtons()
            await homePage.validateAllSectionsLogi(env)
            await homePage.clickhomeCreateAccount()
        })
    })

    test(`📃 TC002 - Footer Subscription : [MyAccount Page] Ensure the existence of footer section and validate the E-mail sign-in functionality`, async ({ page }) => {
        await test.step('Footer Subscription : [MyAccount Page] Ensure the existence of footer section and validate the E-mail sign-in functionality', async () => {
            await page.goto(baseURL + '/en-us/my-account.html')
            const homePage = new HomePage(page)
            await homePage.footerComponent.validateFooterComponent()
            await homePage.footerComponent.validateFooterEmailSubscription()
        })
    })

    test(`📃 TC002.1 - Footer Subscription : [PLP Page] Ensure the existence of footer section and validate the E-mail sign-in functionality`, async ({ page }) => {
        await test.step('Footer Subscription : [PLP Page] Ensure the existence of footer section and validate the E-mail sign-in functionality', async () => {
            await page.goto(baseURL + '/en-us/products/mice.html')
            const plpPage = new PLPPage(page)
            await plpPage.footerComponent.validateFooterComponent()
            await plpPage.footerComponent.validateFooterEmailSubscription()
        })
    })

    test(`📃 TC002.2 - Footer Subscription : [PDP Page] Ensure the existence of footer section and validate the E-mail sign-in functionality`, async ({ page }) => {
        await test.step('Footer Subscription : [PDP Page] Ensure the existence of footer section and validate the E-mail sign-in functionality', async () => {
            await page.goto(baseURL + '/en-us/products/mice/limited-edition-wireless-mouse.html')
            const homePage = new HomePage(page)
            await homePage.footerComponent.validateFooterComponent()
            await homePage.footerComponent.validateFooterEmailSubscription()
        })
    })

    if (["QA65", "Stage65"].includes(env)) {
        test(`📃 TC003 - Notify Me : Verify Notify Me for a non-logged in user by clicking Notify Me button in PLP`, async ({ page }) => {
            await test.step('Notify Me : Verify Notify Me for a non-logged in user by clicking Notify Me button in PLP', async () => {
                const plpPage = new PLPPage(page)
                if (["QA65"].includes(env)) {
                    await page.goto(baseURL + '/en-us/products/mice.html')
                    await plpPage.verifySubscriptionForCS("", false)
                    await plpPage.verifySubscriptionForOOS("", false)
                } else if (["Stage65"].includes(env)) {
                    await page.goto(baseURL + '/en-us/products/keyboards.html')
                    await plpPage.verifySubscriptionForOOS("", false)
                }
            })
        })
    }

    test(`📃 TC004 - Order Details : Guest Order creation and order cancellation from Order Details Page`, async ({ page }) => {
        await test.step('Guest Order creation and order cancellation from Order Details Page', async () => {
            await page.goto(baseURL + '/en-us/products/mice.html')
            const plpPage = new PLPPage(page)
            const checkoutPage = new CheckoutPage(page)
            const orderStatusPage = new OrderStatusPage(page)
            const orderDetailsPage = new OrderDetailsPage(page)
            await plpPage.clickAddToCart(1, '1')
            await plpPage.clickCheckoutButton()
            await checkoutPage.fillNonLoggedInUserCheckoutDetails('marchtesting@yopmail.com', 'fname', 'lname', '7086 Railroad Court', '138177174886')
            //Payment should work only on lower environments
            if (["QA65", "Stage65"].includes(env)) {
                await checkoutPage.fillCardDetailsAndPlaceOrder('4444222233331111', '12/40', '123')
                await page.goto(baseURL + '/en-us/order-status.html')
                await orderStatusPage.searchGuestOrderDetails(CheckoutPage.orderID, 'L0g1t3ch', 'marchtesting@yopmail.com')
                await orderDetailsPage.cancelOrderDetails()
            }
        })
    })

    if (["QA65", "Stage65"].includes(env)) {
        test(`📃 TC005 - New User Creation : Verify Account creation by clicking Create an Account in the CART Page`, async ({ page }) => {
            await test.step('New User Creation : Verify Account creation by clicking Create an Account in the CART Page', async () => {
                await page.goto(baseURL + '/en-us/products/mice.html')
                const plpPage = new PLPPage(page)
                const checkoutPage = new CheckoutPage(page)
                const homePage = new HomePage(page)
                await plpPage.clickAddToCart(1, '1')
                await plpPage.clickCheckoutButton()
                await checkoutPage.clickCreateAnAccount()
                await homePage.clickCreateAnAccountLink()
                await homePage.createAccountValidation()
            })
        })

        test(`📃 TC006 - New User Creation : Verify Account creation by clicking Create an Account Button from Home Page`, async ({ page }) => {
            await test.step('New User Creation : Verify Account creation by clicking Create an Account Button from Home Page', async () => {
                await page.goto(baseURL + '/en-us/my-account.html')
                const homePage = new HomePage(page)
                await homePage.clickhomeCreateAccount()
                await homePage.createAccountValidation()
            })
        })
    }

    test(`📃 TC007 - Email preferences : Verify email preferences functionality using the link in the home Page with unauthenticated view`, async ({ page }) => {
        await test.step('Email preferences : Verify email preferences functionality using the link in the home Page with unauthenticated view', async () => {
            await page.goto(baseURL + '/en-us/my-account.html')
            const homePage = new HomePage(page)
            const emailPreferencesPage = new EmailPreferencesPage(page)
            await homePage.clickLogiEmailPreferences()
            await homePage.verifyPageURL('email-preferences.html')
            await emailPreferencesPage.nonLoggedInUserEmailPreferencesValidation()
        })
    })

    if (["QA65", "Stage65"].includes(env)) {
        test(`📃 TC008 - Ensure the Login/Logout functionalities on My Account page is functional`, async ({ page }) => {
            await test.step('Ensure the login/logut functionalities on My Account page is functional', async () => {
                await page.goto(baseURL + '/en-us/my-account.html')
                const homePage = new HomePage(page)
                const loginPage = new LoginPage(page)
                await homePage.clickhomePageLoginButton()
                await loginPage.loginIntoMyAccountApplication('aganesh@logitech.com', 'Logitech@12345')             //=> orderDetailsUser
                // await loginPage.loginIntoMyAccountApplication('kaverivijay08@gmail.com', 'Kaveriav@#07')         //=> logiUser
                // await loginPage.loginIntoMyAccountApplication('marchtesting@yopmail.com', 'Logitech$#1947')      //=> orderCreationUser
                // await loginPage.loginIntoMyAccountApplication('playwrighttest@yopmail.com', 'Testing$!1947')     //=> playwrightUser
                // await loginPage.loginIntoMyAccountApplication('bkumar@logitech.com', 'Greendust@2022')           //=> addressUser
                // await page.context().storageState({ 'path': 'PageObjects/UserLogins/Logi/Stage65/addressUser.json' })
                await loginPage.logoutFromMyAccountApplication()
                await homePage.validateHomeButtons()
            })
        })
    }
})

if (["QA65", "Stage65"].includes(env)) {
    test.describe(`MyAccount : Logged-In User Generic Test Cases executed in ${env} environment`, async () => {
        test.use({ 'storageState': `PageObjects/UserLogins/Logi/${env}/playwrightUser.json` })
        test(`📃 TC001.1 - Footer Subscription : [MyAccount Page] Ensure the existence of footer section and validate the E-mail sign-in functionality`, async ({ page }) => {
            await test.step('Footer Subscription : [MyAccount Page] Ensure the existence of footer section and validate the E-mail sign-in functionality', async () => {
                await page.goto(baseURL + '/en-us/my-account.html')
                const homePage = new HomePage(page)
                await homePage.footerComponent.validateFooterComponent()
                await homePage.footerComponent.validateFooterEmailSubscription()
            })
        })

        test(`📃 TC001.2 - Footer Subscription : [PLP Page] Ensure the existence of footer section and validate the E-mail sign-in functionality`, async ({ page }) => {
            await test.step('Footer Subscription : [PLP Page] Ensure the existence of footer section and validate the E-mail sign-in functionality', async () => {
                await page.goto(baseURL + '/en-us/products/mice.html')
                const plpPage = new PLPPage(page)
                await plpPage.footerComponent.validateFooterComponent()
                await plpPage.footerComponent.validateFooterEmailSubscription()
            })
        })

        test(`📃 TC001.3 - Footer Subscription : [PDP Page] Ensure the existence of footer section and validate the E-mail sign-in functionality`, async ({ page }) => {
            await test.step('Footer Subscription : [PDP Page] Ensure the existence of footer section and validate the E-mail sign-in functionality', async () => {
                await page.goto(baseURL + '/en-us/products/mice/limited-edition-wireless-mouse.html')
                const homePage = new HomePage(page)
                await homePage.footerComponent.validateFooterComponent()
                await homePage.footerComponent.validateFooterEmailSubscription()
            })
        })

        test(`📃 TC002 - Notify Me : Verify Notify Me for a logged in user by clicking Notify Me button in PLP`, async ({ page }) => {
            await test.step('Notify Me : Verify Notify Me for a logged in user by clicking Notify Me button in PLP', async () => {
                const plpPage = new PLPPage(page)
                if (["QA65"].includes(env)) {
                    await page.goto(baseURL + '/en-us/products/mice.html')
                    await plpPage.verifySubscriptionForCS("playwrighttest@yopmail.com", true)
                    await plpPage.verifySubscriptionForOOS("playwrighttest@yopmail.com", true)
                } else if (["Stage65"].includes(env)) {
                    await page.goto(baseURL + '/en-us/products/keyboards.html')
                    await plpPage.verifySubscriptionForOOS("playwrighttest@yopmail.com", true)
                }
            })
        })

        test(`📃 TC003 - Email preferences : Verify email preferences functionality using the link in the home Page with loggedIn User`, async ({ page }) => {
            await test.step('Email preferences : Verify email preferences functionality using the link in the home Page with loggedIn User', async () => {
                await page.goto(baseURL + '/en-us/my-account.html')
                const homePage = new HomePage(page)
                const emailPreferencesPage = new EmailPreferencesPage(page)
                await homePage.clickLogiEmailPreferences()
                await homePage.verifyPageURL('email-preferences.html')
                await emailPreferencesPage.loggedInUserEmailPreferencesValidation()
            })
        })

        test(`📃 TC004 - Email preferences : Verify Unsubscribe all email functionality with loggedIn User`, async ({ page }) => {
            await test.step('Email preferences : Verify Unsubscribe all email functionality with loggedIn User', async () => {
                await page.goto(baseURL + '/en-us/my-account.html')
                const homePage = new HomePage(page)
                const emailPreferencesPage = new EmailPreferencesPage(page)
                await homePage.clickLogiEmailPreferences()
                await homePage.verifyPageURL('/email-preferences.html')
                await emailPreferencesPage.unSubscribeAllValidation()
            })
        })

        test(`📃 TC005 - Payment Options : Verify Payment Options under ACCOUNT`, async ({ page }) => {
            await test.step('Payment Options : Verify Payment Options under ACCOUNT with loggedIn User', async () => {
                await page.goto(baseURL + '/en-us/my-account.html')
                const homePage = new HomePage(page)
                const paymentOptionsPage = new PaymentOptionsPage(page)
                await homePage.clickLogiPaymentOptions()
                await homePage.verifyPageURL('/payment-options.html')
                await paymentOptionsPage.validateLogiAllPaymentDetails()
            })
        })

        test(`📃 TC006 - Edit Profile : Verify Profile Cancel/Save Functionality for loggedIn User`, async ({ page }) => {
            await test.step('Edit Profile : Verify Profile Cancel/Save Functionality for loggedIn User', async () => {
                await page.goto(baseURL + '/en-us/my-account.html')
                const homePage = new HomePage(page)
                const editProfilePage = new EditProfilePage(page)
                await homePage.clickLogiProfile()
                await homePage.verifyPageURL('/account-information.html')
                await editProfilePage.validateEditProfileCancel()
                await editProfilePage.validateEditProfileSave()
            })
        })

        test(`📃 TC007 - Address Book : Ensure the user is able to create two new addresses and is able to make one as a 'default address' on the Address Book page`, async ({ page }) => {
            await test.step(`TC007 - Ensure the user is able to create two new addresses and is able to make one as a 'default address' on the Address Book page`, async () => {
                await page.goto(baseURL + '/en-us/my-account.html')
                const homePage = new HomePage(page)
                const addressPage = new AddressPage(page)
                await homePage.clickAddressBook()
                await homePage.verifyPageURL('/address-book.html')
                await addressPage.deleteExistingAddresses()
                await addressPage.addAddressValidation('test nickname', 'test fname', 'test lname', '1444 Moore Avenue', '1', 'United States', 'Texas', 'Fort Worth', '73301', '8177174886', { 'counttoVerify': 2 })
                await addressPage.addAddressValidation('nickname', 'firstname', 'lastname', '3191 Hart Country Lane', '2', 'United States', 'Maine', 'Springfield', '04487', '7066170489', { 'counttoVerify': 3 })
            })

            await test.step(`TC007.1 - Ensure the user is able to modify an existing address and is able uncheck the default address option on the Address Book page`, async () => {
                await page.goto(baseURL + '/en-us/my-account.html')
                const homePage = new HomePage(page)
                const addressPage = new AddressPage(page)
                await homePage.clickAddressBook()
                await homePage.verifyPageURL('/address-book.html')
                await addressPage.clickEditIcon(1)
                await addressPage.enterAddressNickName('EditedNickName')
                await addressPage.enterAddressFirstName('EditedFirstName')
                await addressPage.enterAddressLasttName('EditedLastName')
                await addressPage.enterAddresstreetName('1445 Moore Avenue')
                await addressPage.enterAddressApartment('2')
                await addressPage.selectDefaultAddress()
                await addressPage.clickSaveEditedAddress()
                await addressPage.validateSavedAddress(2, 'EditedFirstName' + " " + 'EditedLastName', '1445 Moore Avenue', '2', 'Maine', 'Springfield', '7066170489')

                await addressPage.clickEditIcon(1)
                await addressPage.selectDefaultAddress()
                await addressPage.clickSaveEditedAddress()

                //AEMU-4588 - PhoneNumber field validations
                await addressPage.clickEditIcon(1)
                await addressPage.enterAddressPhoneNumber('123')
                await addressPage.clickSaveEditedAddress()
                await addressPage.validateFieldErrorMessage('Must be between 10 to 20 characters required.')
                await addressPage.enterAddressPhoneNumber('123456789012345678901')
                await addressPage.clickSaveEditedAddress()
                await addressPage.validateFieldErrorMessage('Must be between 10 to 20 characters required.')
                await addressPage.clickCloseSaveAddressPopUp()
            })
        })

        test(`📃 TC008 -  Address Book : Verify Address and My Orders Should not be displayed for Non-SFCC Locales`, async ({ page }) => {
            await test.step(`TC008 -  Address Book : Verify Address and My Orders Should not be displayed for Non-SFCC Locales`, async () => {
                await page.goto(baseURL + '/es-mx/my-account/account-information.html')
                const editProfilePage = new EditProfilePage(page)
                await editProfilePage.verifyProfileInfoForNonEnUS()
            })
        })
    })

    test.describe(`Order Details : Validate complete order creation, cancellation and other validations from Order Details Page executed in ${env} environment`, async () => {
        test.use({ 'storageState': `PageObjects/UserLogins/Logi/${env}/orderCreationUser.json` })
        test(`📃 TC009 - Order Details : Validate complete order creation flow and order cancellation from Order Details Page`, async ({ page }) => {
            await test.step(`Validate complete order creation flow and order cancellation from Order Details Page`, async () => {
                await page.goto(baseURL + '/en-us/products/mice.html')
                const plpPage = new PLPPage(page)
                const checkoutPage = new CheckoutPage(page)
                const myOrdersPage = new MyOrdersPage(page)
                const orderDetailsPage = new OrderDetailsPage(page)
                await plpPage.clickAddToCart(1, '1')
                await plpPage.clickCheckoutButton()
                await checkoutPage.loggedInUserCheckoutDetails()
                await checkoutPage.fillCardDetailsAndPlaceOrder('4444222233331111', '12/40', '123')
                await page.goto(baseURL + '/en-us/my-account/my-orders.html')
                await myOrdersPage.openOrderDetails()
                await orderDetailsPage.cancelOrderDetails()
            })
        })

        test(`📃 TC010 - Order Details : Validate Order details page and verify the View Invoice button not present for 'Accepted' Order`, async ({ page }) => {
            await test.step(`Order Details : Validate Order details page and verify the View Invoice button not present for 'Accepted' Order`, async () => {
                const orderStatusPage = new OrderStatusPage(page)
                const orderDetailsPage = new OrderDetailsPage(page)
                await page.goto(baseURL + '/en-us/order-status.html')
                if (["QA65"].includes(env)) {
                    await orderStatusPage.searchGuestOrderDetails('260402290336', 'L0g1t3ch', 'marchtestingauto@yopmail.com')
                } else if (["Stage65"].includes(env)) {
                    await orderStatusPage.searchGuestOrderDetails('266022070336', 'L0g1t3ch', 'marchtesting@yopmail.com')
                }
                await page.waitForTimeout(2000)
                await orderDetailsPage.validateAcceptedOrderDetails()
            })

            await test.step(`Order Details Error Validations [AEMU-3308 - Scenario : 1] - Refreshing the Order Details Page`, async () => {
                const orderDetailsPage = new OrderDetailsPage(page)
                await page.waitForTimeout(2000)
                await orderDetailsPage.refreshErrorValidation()
            })

            await test.step(`Wrong Order Details Error Validations [AEMU-3308 - Scenario : 2] - Searching wrong Order Details`, async () => {
                const orderStatusPage = new OrderStatusPage(page)
                const orderDetailsPage = new OrderDetailsPage(page)
                await orderStatusPage.searchGuestOrderDetails('123456789', 'randomtext', 'wrongemail@m.com')
                await page.waitForTimeout(2000)
                await orderDetailsPage.wrongOrderDetailsErrorValidation()
            })

            await test.step(`Order Details Error Validations [AEMU-3308 - Scenario : 3] - Refreshing the Order Details Page by opening an Accepted Order`, async () => {
                await page.goto(baseURL + '/en-us/my-account/my-orders.html')
                const orderDetailsPage = new OrderDetailsPage(page)
                await page.waitForTimeout(2000)
                await orderDetailsPage.refreshErrorAcceptedOnOrderDetailsPage()
            })
        })

        test(`📃 TC011 - Order Details : Validate complete order creation flow and order cancellation from MyOrders Page`, async ({ page }) => {
            await test.step(`Validate complete order creation flow and order cancellation from MyOrders Page`, async () => {
                await page.goto(baseURL + '/en-us/products/mice.html')
                const plpPage = new PLPPage(page)
                const checkoutPage = new CheckoutPage(page)
                const myOrdersPage = new MyOrdersPage(page)
                await plpPage.clickAddToCart(1, '1')
                await plpPage.clickCheckoutButton()
                await checkoutPage.loggedInUserCheckoutDetails()
                await checkoutPage.fillCardDetailsAndPlaceOrder('4444222233331111', '12/40', '123')
                await page.goto(baseURL + '/en-us/my-account/my-orders.html')
                await myOrdersPage.cancelOrderDetails()
            })
        })
    })

    test.describe(`Order Details : Validation for 'Complete' Order cases executed in ${env} environment`, () => {
        test.use({ 'storageState': `PageObjects/UserLogins/Logi/${env}/logiUser.json` })
        test(`📃 TC012 - Order Details : Opening any order from Myorders page by clicking Order Details Button and verify the View Invoice button displayed for the 'Complete' Order and download Invoices`, async ({ page }) => {
            await test.step(`Order Details : Opening any order from Myorders page by clicking Order Details Button and verify the View Invoice button displayed for the 'Complete' Order and download Invoices`, async () => {
                await page.goto(baseURL + '/en-us/my-account/my-orders.html')
                const orderDetailsPage = new OrderDetailsPage(page)
                const invoicePage = new InvoicePage(page)
                await orderDetailsPage.clickCompleteOrderDetails()
                await orderDetailsPage.validateCompleteOrderDetails()
                await invoicePage.validateCompleteOrderDetails('TC012')
            })
        })

        test(`📃 TC013 - Order Details : Searching for a Guest Order and verify the View Invoice button displayed for the 'Complete' Order and download more than 1 Invoice`, async ({ page }) => {
            await test.step(`Order Details : Searching for a Guest Order and verify the View Invoice button displayed for the 'Complete' Order and download more than 1 Invoice`, async () => {
                await page.goto(baseURL + '/en-us/order-status.html')
                const orderStatusPage = new OrderStatusPage(page)
                const orderDetailsPage = new OrderDetailsPage(page)
                const invoicePage = new InvoicePage(page)
                if (["QA65"].includes(env)) {
                    await orderStatusPage.searchGuestOrderDetails('265036640336', 'L0g1t3ch', 'geitrejeinajo-9421@yopmail.com')
                } else if (["Stage65"].includes(env)) {
                    await orderStatusPage.searchGuestOrderDetails('266012340336', 'L0g1t3ch', 'marchtesting@yopmail.com')
                }
                await page.waitForTimeout(2000)
                await orderDetailsPage.validateCompleteOrderDetails()
                await invoicePage.validateCompleteOrderDetails('TC013')
            })
        })

        test(`📃 TC014 - Order Details : Searching for a [ja-jp] Guest Order and verify the View Invoice button displayed for the 'Complete' Order and download Multiple Invoices`, async ({ page }) => {
            await test.step(`Order Details : Searching for a [ja-jp] Guest Order and verify the View Invoice button displayed for the 'Complete' Order and download Multiple Invoices`, async () => {
                await page.goto(baseURL + '/en-us/order-status.html')
                const orderStatusPage = new OrderStatusPage(page)
                const orderDetailsPage = new OrderDetailsPage(page)
                const invoicePage = new InvoicePage(page)
                if (["QA65"].includes(env)) {
                    await orderStatusPage.searchGuestOrderDetails('265168450336', 'L0g1t3ch', 'grezugeivefreu-9112@yopmail.com')
                } else if (["Stage65"].includes(env)) {
                    await orderStatusPage.searchGuestOrderDetails('266012340336', 'L0g1t3ch', 'marchtesting@yopmail.com')
                }
                await page.waitForTimeout(2000)
                await orderDetailsPage.validateCompleteOrderDetails()
                await invoicePage.validateCompleteOrderDetails('TC014')
            })
        })

        test(`📃 TC015 - Order Details : Opening any order from Myorders page by clicking Order Details Button and verify Discount Product Price Strike Verification`, async ({ page }) => {
            await test.step(`Order Details : Opening any order from Myorders page by clicking Order Details Button and verify Discount Product Price Strike Verification`, async () => {
                await page.goto(baseURL + '/en-us/my-account/my-orders.html')
                const orderDetailsPage = new OrderDetailsPage(page)
                const invoicePage = new InvoicePage(page)
                if (["QA65"].includes(env)) {
                    await orderDetailsPage.clickOrderDetailsSpecificOrder('277936510336', 0)
                    await orderDetailsPage.verifyDiscountedPriceInOrderDetails(0)
                } else if (["Stage65"].includes(env)) {
                    await orderDetailsPage.clickOrderDetailsSpecificOrder('266013180336', 2)
                    await orderDetailsPage.verifyDiscountedPriceInOrderDetails(2)
                }
                await orderDetailsPage.validateCompleteOrderDetails()
                await invoicePage.validateCompleteOrderDetails('TC015')
            })
        })

        test(`📃 TC016 - Order Details : Ensure the section headings - 'Order Placed', 'Order #' and 'Status' are displayed under 'RECENT ORDERS' & 'ALL OTHER ORDERS' sections`, async ({ page }) => {
            await test.step(`Ensure the section headings - 'Order Placed', 'Order #' and 'Status' are displayed under 'RECENT ORDERS' & 'ALL OTHER ORDERS' sections`, async () => {
                await page.goto(baseURL + '/en-us/my-account/my-orders.html')
                const myOrdersPage = new MyOrdersPage(page)
                await myOrdersPage.verifyOrdersSection()
                await myOrdersPage.verifyMyOrderHeaderDetails()
                await myOrdersPage.verifyLegacyDetails('YES')

                await page.goto(baseURL + '/en-gb/my-account/my-orders.html')
                await myOrdersPage.verifyOrdersSection()
                await myOrdersPage.verifyMyOrderHeaderDetails()
                await myOrdersPage.verifyLegacyDetails('NO')


                await page.goto(baseURL + '/en-ca/my-account/my-orders.html')
                await myOrdersPage.verifyOrdersSection()
                await myOrdersPage.verifyMyOrderHeaderDetails()
                await myOrdersPage.verifyLegacyDetails('NO')
            })
        })

        test(`📃 TC017 - Order Details : Searching for a Guest Order for ja-jp locale and verify the Order # & Status text is seen localized`, async ({ page }) => {
            await test.step(`Order Details : Searching for a Guest Order for ja-jp locale and verify the Order # & Status text is seen localized`, async () => {
                await page.goto(baseURL + '/ja-jp/order-status.html')
                const orderStatusPage = new OrderStatusPage(page)
                const orderDetailsPage = new OrderDetailsPage(page)
                if (["QA65"].includes(env)) {
                    await orderStatusPage.searchGuestOrderDetails('265036640336', 'L0g1t3ch', 'geitrejeinajo-9421@yopmail.com')
                } else if (["Stage65"].includes(env)) {
                    await orderStatusPage.searchGuestOrderDetails('266012340336', 'L0g1t3ch', 'marchtesting@yopmail.com')
                }
                await page.waitForTimeout(2000)
                await orderDetailsPage.validateJaJpOrderDetails()
            })
        })
    })

    test.describe(`Address Book : Address field level Validations excuted in ${env} environment`, () => {
        test.use({ 'storageState': `PageObjects/UserLogins/Logi/${env}/addressUser.json` })
        test(`📃 TC018 - Address Book : Add/Edit field validations in Address Book`, async ({ page }) => {
            await test.step(`TC013 - My Account Address | Add/Edit field validations`, async () => {
                await page.goto(baseURL + '/en-us/my-account.html')
                const homePage = new HomePage(page)
                const addressPage = new AddressPage(page)
                await homePage.clickLogiAddressBook()
                await homePage.verifyPageURL('/address-book.html')
                await addressPage.deleteExistingAddresses()
                await addressPage.addressFieldsValidationAdd()
                await page.waitForTimeout(1000)
                await addressPage.addressFieldsValidationEdit()
            })
        })

        test(`📃 TC019-AEMU-4450 - Space in post code field validation in checkout page`, async ({ page }) => {
            await test.step(`TC019 - Space in post code field validation in checkout page`, async () => {
                const plpPage = new PLPPage(page)
                const checkoutPage = new CheckoutPage(page)
                await page.goto(baseURL + '/en-us/my-account.html')
                const homePage = new HomePage(page)
                const addressPage = new AddressPage(page)
                await homePage.clickLogiAddressBook()
                await homePage.verifyPageURL('/address-book.html')
                await addressPage.deleteExistingAddresses()
                await addressPage.addAddressValidation('test nickname', 'test fname', 'test lname', '1444 Moore Avenue', '1', 'United States', 'Texas', 'Fort Worth', ' 73301 ', '8177174886')
                await page.goto(baseURL + '/en-us/products/mice.html')
                await plpPage.clickAddToCart(1, '1')
                await plpPage.clickCheckoutButton()
                await page.waitForTimeout(2000)
                await checkoutPage.validateEditLink()
            })
        })
    })
}