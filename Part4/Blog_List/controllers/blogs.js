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
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }
    let authorUser = await User.findOne({ _id: decodedToken.id })
    blog.User = authorUser.id
    const result = await blog.save()
    authorUser.Blog.push(result.id)
    await authorUser.save()
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