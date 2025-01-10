import { Router } from "express";
import Blog from '../models/blog.js'

const BlogsRouter = Router()

BlogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

BlogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    const result = await blog.save()
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