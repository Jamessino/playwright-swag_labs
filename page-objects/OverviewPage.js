import {expect} from "@playwright/test"

export class OverviewPage {
    constructor(page) {
        this.page = page

        this.pageTitle = page.locator('.title')
        this.finishOrderButton = page.getByRole('button', {name: 'finish'} )
    }

    verifyPageDisplay = async () => {
        await this.pageTitle.waitFor()
        await expect(this.pageTitle).toHaveText('Checkout: Overview')
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

    verifyTotalPrice = async (expectedPrice) => {
        const PriceWithoutTaxElement = this.page.locator('.summary_subtotal_label')
        await PriceWithoutTaxElement.waitFor()
        const PriceWithoutTaxText = await PriceWithoutTaxElement.innerText()
        const priceWithoutTax = parseFloat(PriceWithoutTaxText.replace('Item total: $', ''))

        expect(priceWithoutTax,
             'CheckoutOverview page: Items total price without Tax is not as expected').toBe(expectedPrice)

    }

    finishOrder = async () => {
        
        await this.finishOrderButton.waitFor()
        await this.finishOrderButton.click()
    }

}