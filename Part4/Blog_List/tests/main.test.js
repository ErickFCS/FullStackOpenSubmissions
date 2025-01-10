import { test, describe } from 'node:test';
import assert from 'node:assert';
import listHelper from '../utils/list_helper.js';

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
})

const blogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
]

describe('total likes', () => {
    test('when list has only one blog, equals the likes of that', () => {
        let result = listHelper.totalLikes(blogs.slice(0, 1))
        assert.strictEqual(result, 7)
        result = listHelper.totalLikes(blogs.slice(1, 2))
        assert.strictEqual(result, 5)
        result = listHelper.totalLikes(blogs.slice(2, 3))
        assert.strictEqual(result, 12)
    })

    test('when list has only two blogs, equals the sum of likes of them', () => {
        let result = listHelper.totalLikes(blogs.slice(0, 2))
        assert.strictEqual(result, 12)
        result = listHelper.totalLikes(blogs.slice(2, 4))
        assert.strictEqual(result, 22)
        result = listHelper.totalLikes(blogs.slice(4, 6))
        assert.strictEqual(result, 2)
    })

    test('when list has many blogs, equals the sum of likes of them', () => {
        const result = listHelper.totalLikes(blogs)
        assert.strictEqual(result, 36)
    })
})

describe('favorite blog', () => {
    test('when list has only one blog, equals that blog', () => {
        let result = listHelper.favoriteBlog(blogs.slice(0, 1))
        assert.deepStrictEqual(result, blogs[0])
        result = listHelper.favoriteBlog(blogs.slice(1, 2))
        assert.deepStrictEqual(result, blogs[1])
        result = listHelper.favoriteBlog(blogs.slice(2, 3))
        assert.deepStrictEqual(result, blogs[2])
    })

    test('when list has only two blogs, equals the one with more likes', () => {
        let result = listHelper.favoriteBlog(blogs.slice(0, 2))
        assert.deepStrictEqual(result, blogs[0])
        result = listHelper.favoriteBlog(blogs.slice(2, 4))
        assert.deepStrictEqual(result, blogs[2])
        result = listHelper.favoriteBlog(blogs.slice(4, 6))
        assert.deepStrictEqual(result, blogs[5])
    })

    test('when list has many blogs, equals the one with more likes', () => {
        const result = listHelper.favoriteBlog(blogs)
        assert.deepStrictEqual(result, blogs[2])
    })
})

describe('most blogs', () => {
    test('when list has only one blog, equals that blog author and number 1', () => {
        let result = listHelper.mostBlogs(blogs.slice(0, 1))
        assert.deepStrictEqual(result, {
            author: "Michael Chan",
            blogs: 1
        })
        result = listHelper.mostBlogs(blogs.slice(1, 2))
        console.log(result);
        assert.deepStrictEqual(result, {
            author: "Edsger W. Dijkstra",
            blogs: 1
        })
        result = listHelper.mostBlogs(blogs.slice(2, 3))
        console.log(result);
        assert.deepStrictEqual(result, {
            author: "Edsger W. Dijkstra",
            blogs: 1
        })
    })

    test('when list has only two blogs, equals the one with more likes author and number 1', () => {
        let result = listHelper.mostBlogs(blogs.slice(0, 2))
        assert.deepStrictEqual(result, {
            author: "Edsger W. Dijkstra",
            blogs: 1
        })
        result = listHelper.mostBlogs(blogs.slice(2, 4))
        assert.deepStrictEqual(result, {
            author: "Robert C. Martin",
            blogs: 1
        })
    })

    test('when list has only two blogs with the same author, equals the author and number 2', () => {
        let result = listHelper.mostBlogs(blogs.slice(4))
        assert.deepStrictEqual(result, {
            author: "Robert C. Martin",
            blogs: 2
        })
    })

    test('when list has many blogs, equals the one with more likes author and number of blogs posted', () => {
        const result = listHelper.mostBlogs(blogs)
        assert.deepStrictEqual(result, {
            author: "Robert C. Martin",
            blogs: 3
        })
    })
})