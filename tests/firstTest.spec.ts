import {test} from '@playwright/test'


test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})


test('locator systax rules', async({page}) => {
    //By Tag Name
    await page.locator('input').first().click()

    //By ID
    page.locator('inputEmail1')

    //By class value
    page.locator('.shape-rectangle')

    //By attribiute
    page.locator('[placeholder="Email"]')

    //By class value full
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    //Combine different selectors
    page.locator('input[placeholder="Email"]')

    //By Xpath (Not Recommended)
    page.locator('//*[@id="inputEmail1"]')

    //By partial text match
    page.locator(':text("Using')

    //By exact text match
    page.locator(':text-is("Using the Grid")')

})

test('User facing locators', async({page}) => {
    await page.getByRole('textbox',{name: "Email"}).first().click()
    await page.getByRole('button',{name:"Sign in"}).first().click()

    await page.getByLabel('Email').first().click()

    await page.getByPlaceholder('Jane Doe').click()

    await page.getByText('Using the Grid').click()

    await page.getByTestId('SignIn').click()

    await page.getByTitle('IoT Dashboard').click()
})

test('locating child elements', async({page}) => {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

    await page.locator('nb-card').getByRole('button',{name: "Sign in"}).first().click()

    await page.locator('nb-card').nth(1).getByRole('button').click()
})