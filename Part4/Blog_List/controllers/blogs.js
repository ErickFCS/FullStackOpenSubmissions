import { Router } from "express";
import Blog from '../models/blog.js'
import User from '../models/user.js'

const BlogsRouter = Router()

BlogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('User', { username: 1, name: 1, id: 1 })
    response.json(blogs)
})

BlogsRouter.post('/', async (request, response) => {
    let blog = new Blog(request.body)
    let firstUser = await User.findOne({})
    blog.User = firstUser.id
    const result = await blog.save()
    firstUser.Blog.push(result.id)
    await firstUser.save()
    response.status(201).json(result)
})

BlogsRouter.delete('/:id', async (request, response) => {
    await Blog.deleteOne({ _id: request.params.id })
    response.status(201).end()
})

BlogsRouter.put('/:id', async (request, response) => {
    const result = await Blog.updateOne({ _id: request.params.id }, request.body)
    response.status(200).json(result.body)
})

export default BlogsRouter