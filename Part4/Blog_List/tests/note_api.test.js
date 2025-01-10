import { test, describe, after, beforeEach } from 'node:test'
import assert from 'node:assert'
import app from '../app.js'
import Blog from '../models/blog.js'
import supertest from 'supertest'
import mongoose from 'mongoose'

const api = supertest(app)

const blogs = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
    },
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
    },
    {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
    },
    {
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
    },
    {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
    },
    {
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
    }
]

describe('Blogs API tests', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(blogs)
    })
    test('Get request to /api/blogs', async () => {
        const result = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        assert.deepStrictEqual(
            result.body.map(({ title, author, url, likes }) => ({ title, author, url, likes })),
            blogs.map(({ title, author, url, likes }) => ({ title, author, url, likes }))
        )
    })
    test('Verify id property is named id and not _id', async () => {
        const result = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        assert.strictEqual(
            result.body.every((e) => (Object.hasOwn(e, "id") && !Object.hasOwn(e, "_id"))),
            true
        )
    })
    test('Post request to /api/blogs', async () => {
        const newBlog = {
            title: "New blog",
            author: "New author",
            url: "http://newblog.com",
            likes: 5
        }
        const result = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const { title, author, url, likes } = result.body
        assert.deepStrictEqual(
            { title, author, url, likes },
            newBlog
        )
        const result2 = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        assert.deepStrictEqual(
            result2.body
                .map(({ title, author, url, likes }) => ({ title, author, url, likes })),
            blogs
                .concat(newBlog)
                .map(({ title, author, url, likes }) => ({ title, author, url, likes }))
        )
    })
    test('Verify likes property is default to 0', async () => {
        const newBlog = {
            title: "New blog",
            author: "New author",
            url: "http://newblog.com",
        }
        const result = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const { title, author, url, likes } = result.body
        assert.deepStrictEqual(
            { title, author, url, likes },
            { ...newBlog, likes: 0 }
        )
    })
    test('Verify bad request', async () => {
        const newBlog = {
            title: "New blog",
            author: "New author",
            url: "http://newblog.com",
            likes: 5
        }
        const result = await api
            .post('/api/blogs')
            .send({ ...newBlog, title: null })
            .expect(400)
            .expect('Content-Type', /application\/json/)
        const result2 = await api
            .post('/api/blogs')
            .send({ ...newBlog, url: null })
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })
    test('Delete request to /api/blogs/:id', async () => {
        const { body: blogs } = await api.get('/api/blogs')
        await api.delete(`/api/blogs/${blogs[0].id}`)
        const { body: result } = await api.get('/api/blogs')
        assert.deepStrictEqual(
            result,
            blogs.slice(1)
        )
    })
    test('Put request to /api/blogs/:id', async () => {
        let { body: blogs } = await api.get('/api/blogs')
        const newBlog = { ...blogs[0], title: "newTitle", author: "newAuthor", url: "http://newblog.com", likes: 10 }
        const res = await api
            .put(`/api/blogs/${blogs[0].id}`)
            .send(newBlog)
            .expect(200)
        const { body: result } = await api.get('/api/blogs')
        blogs.splice(0, 1, { ...newBlog, id: blogs[0].id })
        assert.deepStrictEqual(
            result,
            blogs
        )
    })
    after(async () => {
        await mongoose.connection.close()
    })
})