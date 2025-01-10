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

export default BlogsRouter