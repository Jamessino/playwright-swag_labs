import {expect} from "@playwright/test"


export class AddressPage {
    constructor(page) {
        this.page=page

        this.pageTitle = page.locator('.title')
        this.firstName = page.locator('#first-name')
        this.lastName = page.locator('#last-name')
        this.postalCode = page.locator('#postal-code')
        this.continueButton = page.locator('#continue')
    }

    fillInForm = async (person) => {

        await this.firstName.waitFor()
        await this.firstName.fill(person.firstName)
        expect(await this.firstName).toHaveValue(person.firstName)

        await this.lastName.waitFor()
        await this.lastName.fill(person.lastName)
        expect(await this.lastName).toHaveValue(person.lastName)

        await this.postalCode.waitFor()
        await this.postalCode.fill(person.postalCode)
        expect(await this.postalCode).toHaveValue(person.postalCode)
    }

    verifyPageDisplay = async () => {
        await this.pageTitle.waitFor()
        await expect(this.pageTitle).toHaveText('Checkout: Your Information')
    }

    goToOverview = async () => {
        this.continueButton.waitFor()
        this.continueButton.click()

    }

}