import {expect} from "@playwright/test"

export class CartPage {
    constructor(page) {
        this.page = page

        this.checkoutButton = page.getByRole('button', { name: "checkout"})
        this.pageTitle = page.locator('.title')
    }

    verifyPageDisplay = async () => {
        await this.pageTitle.waitFor()
        await expect(this.pageTitle).toHaveText('Your Cart')
    }

    verifyProductPrice = async (product) => {
        const priceElement = this.page.locator(
            `.cart_item_label:has-text("${product.name}") .inventory_item_price`)
            await priceElement.waitFor()
            const priceText = await priceElement.innerText()
            const priceNumber = parseFloat(priceText.replace('$', ''))

            expect(priceNumber, `CartPage: Product "${product.name}" has different price than expected.`)
            .toBe(product.testedPrice)

            return priceNumber
    }

    checkoutItems = async () => {
        await this.checkoutButton.waitFor()
        await this.checkoutButton.click()
    }

}