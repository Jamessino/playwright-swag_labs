import {expect, test} from "@playwright/test"
import {ProductsPage} from "../page-objects/ProductsPage"
import {LoginPage} from "../page-objects/LoginPage"
import {address, sauceLabsBackpack, sauceLabsFleeceJacket,
        STANDART_USER, LOCKED_OUT_USER, PROBLEM_USER} from "../page-objects/TestData"
import {CartPage} from "../page-objects/CartPage"
import {AddressPage} from "../page-objects/AddressPage"
import {OverviewPage} from "../page-objects/OverviewPage"
import {CheckoutCompletePage} from "../page-objects/CompletePage"


async function fullEndToEndTestJourney(page, user) {
	let itemsPrice = 0
	const loginPage = new LoginPage(page)
	await loginPage.login(user)

	// add products to basket
	const productsPage = new ProductsPage(page)
	await productsPage.verifyPageDisplay()
	await productsPage.addProductToBasket(sauceLabsFleeceJacket)
	await productsPage.addProductToBasket(sauceLabsBackpack)

	// Check price of products
	itemsPrice += await productsPage.checkProductPrice(sauceLabsFleeceJacket)
	itemsPrice += await productsPage.checkProductPrice(sauceLabsBackpack)

	await productsPage.goToCart()
    
	// check product in basket
	const cartPage = new CartPage(page)
	await cartPage.verifyPageDisplay()
	await cartPage.verifyProductPrice(sauceLabsFleeceJacket)
	await cartPage.verifyProductPrice(sauceLabsBackpack)

	// click to checkout button
	await cartPage.checkoutItems()

	// fill in name and address
	const addressPage = new AddressPage(page)
	await addressPage.verifyPageDisplay()
	await addressPage.fillInForm(user)
	await addressPage.goToOverview()

	// check final prices in cart
	const overviewPage = new OverviewPage(page)
	await overviewPage.verifyPageDisplay()
	await overviewPage.verifyProductPrice(sauceLabsFleeceJacket)
	await overviewPage.verifyProductPrice(sauceLabsBackpack)
	await overviewPage.verifyTotalPrice(itemsPrice)
	await overviewPage.finishOrder()

	// "Thank you" page
	const completePage = new CheckoutCompletePage(page)
	await completePage.verifyPageDisplay()
	await completePage.backHome()
	await productsPage.verifyPageDisplay()
}

async function AccessDeniedTest(page, user) {
	let itemsPrice = 0
	const loginPage = new LoginPage(page)
	await loginPage.login(user)
    await loginPage.checkAccessDenied()

}

test.describe('E-shop test', () => {
    test.beforeEach("Open web app", async ({ page }) => {
      await page.setViewportSize({width: 1366, height:720})
      // Go to the starting url before each test.
      await page.goto(address)
    });

    test("Standart access user", async ({page}) => {
        await fullEndToEndTestJourney(page, STANDART_USER);
    });
    
    test("No access user", async ({page}) => {
        await AccessDeniedTest(page, LOCKED_OUT_USER);
    });
    
    test("Broken eshop user", async ({page}) => {
        await fullEndToEndTestJourney(page, PROBLEM_USER);
    
});
    

    test.afterEach(async ({page}) => {
        // click to burger-menu
        await page.click('#react-burger-menu-btn');

        // wait for showing logout item
        await page.waitForSelector('.bm-item-list');
        await page.click('a[id="logout_sidebar_link"]');

    });

});