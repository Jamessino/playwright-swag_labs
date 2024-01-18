import { expect } from "@playwright/test"

export class LoginPage {
    constructor(page, user) {
        this.page = page

        this.usernameInput = page.getByPlaceholder('Username')
        this.passwordInpout = page.getByPlaceholder('Password')
        this.submitButton = page.locator('#login-button')
        this.productsPage = page.getByText('Products')
        this.deniedMessage = page.locator('h3[data-test="error"]')
        
    }

    login = async (person) => {
        //type into Usernameinput
        await this.passwordInpout.waitFor()
        await this.usernameInput.fill(person.username)

        //type into Password input
        await this.passwordInpout.waitFor()
        await this.passwordInpout.fill(person.password)

        //Click to Login button
        await this.submitButton.waitFor()
        await this.submitButton.click()
    }

    checkAccessDenied = async () => {
        try {
            await expect(this.deniedMessage).toHaveText(
                'Epic sadface: Sorry, this user has been locked out.', {timeout: 4000})
            console.log('Test PASS: Message "Access Denied" was shown as expected')
        } catch (error) {
            console.error('Test FAIL: Message "Access Denied" was NOT shown as expected', error)
            throw error
        }

    }
}
