import {expect} from "@playwright/test"


export class ProductsPage {
    constructor(page) {
        this.page = page

        this.basket = page.locator('#shopping_cart_container')
        this.pageTitle = page.locator('.title')

    }

    // showBasketPosition = async () => {
    //     await this.basket.scrollIntoViewIfNeeded({timeout: 600})
    // }

    verifyPageDisplay = async () => {
        await this.pageTitle.waitFor()
        await expect(this.pageTitle).toHaveText('Products')
    }

    getBasketCount = async () => {
        // return number
        await this.basket.waitFor()
        const text = await this.basket.innerText()
        if (text === '') {
            return 0
        } else {
        return parseInt(text, 10)
        }

    }

    
    addProductToBasket = async (product) => {
        const addToCartButton = this.page.locator(`${product.addButton}`)
        const removeButton = this.page.locator(`${product.removeButton}`)

        await addToCartButton.waitFor()
        const basketCountBeforeAdding = await this.getBasketCount()
        console.log("basket count before: ", basketCountBeforeAdding)

        await addToCartButton.click()
        await expect(removeButton).toHaveText("Remove")

        const basketCountAfterAdding = await this.getBasketCount()

        expect(basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding)
      
    }

    checkProductPrice = async (product) => {
        const priceElement = this.page.locator(
            `.inventory_item_description:has-text("${product.name}") .inventory_item_price`)

        await priceElement.waitFor()
        const priceText = await priceElement.innerText()
        const priceNumber = parseFloat(priceText.replace('$', ''))
        product.testedPrice = priceNumber

        expect(priceNumber).toBe(product.expectedPrice)

        return priceNumber

    }

    goToCart = async () => {
        await this.basket.waitFor()
        await this.basket.click()

        //verification of items in checkout

    }
}