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