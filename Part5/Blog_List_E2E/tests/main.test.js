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

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      const usernameInput = await page.locator('input[name="username"]')
      const passwordInput = await page.locator('input[name="password"]')
      const loginButton = await page.getByRole('button', { name: 'login' })
      await usernameInput.fill('test_user')
      await passwordInput.fill('testUserPassword')
      await loginButton.click()
    })

    test('a new blog can be created', async ({ page }) => {
      const createBlogButton = await page.getByRole('button', { name: 'create new blog' })
      const titleInput = await page.getByPlaceholder('title')
      const authorInput = await page.getByPlaceholder('author')
      const urlInput = await page.getByPlaceholder('url')
      const createButton = await page.getByRole('button', { name: 'create' })
      await createBlogButton.click()
      await titleInput.fill('Test Title')
      await authorInput.fill('This doesn\'t matter')
      await urlInput.fill('https://www.testBlogUrl.com')
      await createButton.click()
      await expect(page.getByText('blog creating successed')).toBeVisible()
      const showButton = await page.getByRole('button', { name: 'Show' })
      await showButton.click()
      const container = await page.locator('div > p')
      await expect(container.getByText('Test Title')).toBeVisible()
      await expect(container.getByText('test_user')).toBeVisible()
      await expect(container.getByText('likes 0')).toBeVisible()
      await expect(container.getByText('https://www.testBlogUrl.com')).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      const createBlogButton = await page.getByRole('button', { name: 'create new blog' })
      const titleInput = await page.getByPlaceholder('title')
      const authorInput = await page.getByPlaceholder('author')
      const urlInput = await page.getByPlaceholder('url')
      const createButton = await page.getByRole('button', { name: 'create' })
      await createBlogButton.click()
      await titleInput.fill('Test Title')
      await authorInput.fill('This doesn\'t matter')
      await urlInput.fill('https://www.testBlogUrl.com')
      await createButton.click()
      const showButton = await page.getByRole('button', { name: 'Show' })
      await showButton.click()
      const likeButton = await page.getByRole('button', { name: 'like' })
      await likeButton.click()
      await expect(page.getByText('Liked')).toBeVisible()
      const container = await page.locator('div > p')
      await expect(container.getByText('likes 1')).toBeVisible()
    })

    test.only('a blog can be deleted', async ({ page }) => {
      const createBlogButton = await page.getByRole('button', { name: 'create new blog' })
      const titleInput = await page.getByPlaceholder('title')
      const authorInput = await page.getByPlaceholder('author')
      const urlInput = await page.getByPlaceholder('url')
      const createButton = await page.getByRole('button', { name: 'create' })
      await createBlogButton.click()
      await titleInput.fill('Test Title')
      await authorInput.fill('This doesn\'t matter')
      await urlInput.fill('https://www.testBlogUrl.com')
      await createButton.click()
      const showButton = await page.getByRole('button', { name: 'Show' })
      await showButton.click()
      page.on('dialog', async (dialog) => {
        await dialog.accept();
      });
      const removeButton = await page.getByRole('button', { name: 'remove' })
      await removeButton.click()
      const container = await page.locator('div > p')
      await expect(container.first()).not.toBeVisible()
    })

  })

})