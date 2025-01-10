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
    after(async () => {
        await mongoose.connection.close()
    })
})