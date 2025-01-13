import { Router } from 'express';
import Blog from '../models/blog.js'
import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import config from '../utils/config.js'

const BlogsRouter = Router()

BlogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('User', { username: 1, name: 1, id: 1 })
    response.json(blogs)
})

BlogsRouter.post('/', async (request, response) => {
    let blog = new Blog(request.body)
    const decodedToken = jwt.verify(request.token, config.JWT_SECRET)
    if (!decodedToken.id) return response.status(401).json({ error: 'token invalid' })
    let authorUser = await User.findOne({ _id: decodedToken.id })
    blog.User = authorUser.id
    const result = await blog.save()
    authorUser.Blog.push(result.id)
    await authorUser.save()
    response.status(201).json(result)
})

BlogsRouter.delete('/:id', async (request, response) => {
    const decodedToken = jwt.verify(request.token, config.JWT_SECRET)
    if (!decodedToken.id) return response.status(401).json({ error: 'token invalid' })
    const user = await User.findOne({ _id: decodedToken.id })
    if (!user) return response.status(401).json({ error: 'no valid user' })
    const blog = await Blog.findOne({ _id: request.params.id })
    if (!blog) return response.status(404).json({ error: 'no valid blog' })
    if (blog.User.toString() !== decodedToken.id) return response.status(401).json({ error: 'You dont have permission to delete this blog' })
    await Blog.deleteOne({ _id: request.params.id })
    user.Blog = user.Blog.filter((e) => (e.toString !== blog.id))
    await user.save()
    response.status(204).end()
})

BlogsRouter.put('/:id', async (request, response) => {
    const result = await Blog.updateOne({ _id: request.params.id }, request.body)
    response.status(200).json(result.body)
})

export default BlogsRouter