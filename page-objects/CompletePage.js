import {expect} from "@playwright/test"

export class CheckoutCompletePage {
    constructor(page) {
        this.page = page

        this.pageTitle = page.locator('.title')
        this.backToHomeButton = page.locator('button[data-test="back-to-products"]')

    }

    verifyPageDisplay = async () => {
        await this.pageTitle.waitFor()
        await expect(this.pageTitle).toHaveText('Checkout: Complete!')
    }

    backHome = async() => {
        const backToHomeButton = this.page.locator('button[data-test="back-to-products"]')
        await backToHomeButton.waitFor()
        await backToHomeButton.click()
    }
}
