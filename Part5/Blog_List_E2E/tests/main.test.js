const { test, expect, beforeEach, describe, request } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    const requests = await request.newContext()
    await requests.post('/api/tests/reset')
    await requests.post('/api/users', {
      data: {
        name: "Test User",
        username: "test_user",
        password: 'testUserPassword'
      }
    })
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    const logInTitle = await page.getByRole('heading', { name: 'log in to application' })
    const usernameInput = await page.locator('input[name="username"]')
    const passwordInput = await page.locator('input[name="password"]')
    const loginButton = await page.getByRole('button', { name: 'login' })
    await expect(logInTitle).toBeVisible()
    await expect(usernameInput).toBeVisible()
    await expect(passwordInput).toBeVisible()
    await expect(loginButton).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      const usernameInput = await page.locator('input[name="username"]')
      const passwordInput = await page.locator('input[name="password"]')
      const loginButton = await page.getByRole('button', { name: 'login' })
      await usernameInput.fill('test_user')
      await passwordInput.fill('testUserPassword')
      await loginButton.click()
      await expect(page.getByText('login successful')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      const usernameInput = await page.locator('input[name="username"]')
      const passwordInput = await page.locator('input[name="password"]')
      const loginButton = await page.getByRole('button', { name: 'login' })
      await usernameInput.fill('test_user')
      await passwordInput.fill('testUserWrongPassword')
      await loginButton.click()
      await expect(page.getByText('login unsuccessful')).toBeVisible()
      await usernameInput.fill('wrong_user')
      await passwordInput.fill('testUserPassword')
      await loginButton.click()
      await expect(page.getByText('login unsuccessful')).toBeVisible()
    })
  })

})