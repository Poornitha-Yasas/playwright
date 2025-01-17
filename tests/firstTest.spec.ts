import {expect, test} from '@playwright/test'


test.beforeEach(async ({page}) => {
  await page.goto('http://localhost:4200/')
  await page.getByText('Forms').click()
  await page.getByText('Form Layouts').click()
})


test('locator systax rules', async ({page}) => {
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

test('User facing locators', async ({page}) => {
  await page.getByRole('textbox', {name: "Email"}).first().click()
  await page.getByRole('button', {name: "Sign in"}).first().click()

  await page.getByLabel('Email').first().click()

  await page.getByPlaceholder('Jane Doe').click()

  await page.getByText('Using the Grid').click()

  await page.getByTestId('SignIn').click()

  await page.getByTitle('IoT Dashboard').click()
})

test('locating child elements', async ({page}) => {
  await page.locator('nb-card nb-radio :text-is("Option 1")').click()
  await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

  await page.locator('nb-card').getByRole('button', {name: "Sign in"}).first().click()

  await page.locator('nb-card').nth(1).getByRole('button').click()
})

test('locating parent elements', async ({page}) => {
  await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"}).click()
  await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', {name: "Email"}).click()

  await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: "Email"}).click()
  await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox', {name: "Password"}).click()

  await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in"}).getByRole('textbox', {name: "Email"}).click()

  await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name: "Password"}).click()

})

test('reusing locators', async ({page}) => {
  const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
  const emailField = basicForm.getByRole('textbox', {name: "Email"})

  await emailField.fill('test@tet.com')
  await basicForm.getByRole('textbox', {name: "Password"}).fill('welcome1123')
  await basicForm.locator('nb-checkbox').click()
  await basicForm.getByRole('button').click()

  await expect(emailField).toHaveValue('test@tet.com')
})

test('extracting values', async ({page}) => {
  //Single Text Value
  const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
  const buttonText = await basicForm.getByRole('button').textContent()

  expect(buttonText).toEqual('Submit')

  //All Text Values
  const allRadioButtonsLables = await page.locator('nb-radio').allTextContents()
  expect(allRadioButtonsLables).toContain('Option 1')

  //Input Values
  const emailField = basicForm.getByRole('textbox', {name: "Email"})
  await emailField.fill('test@gmail.com')
  const emailValue = await emailField.inputValue()
  expect(emailValue).toEqual('test@gmail.com')

  const placeholderValue = await emailField.getAttribute('placeholder')
  expect(placeholderValue).toEqual('Email')

})

test('assertions', async ({page}) => {
  const basicFormButton = page.locator('nb-card').filter({hasText: "Basic form"}).locator('button')

  //General Assertions
  const value = 5
  expect(value).toEqual(5)

  const text = await basicFormButton.textContent()
  expect(text).toEqual('Submit')

  //Locator Assertions
  await expect(basicFormButton).toHaveText('Submit')

  //Soft Assertions
  await expect.soft(basicFormButton).toHaveText('Submit')
  await basicFormButton.click()

})

