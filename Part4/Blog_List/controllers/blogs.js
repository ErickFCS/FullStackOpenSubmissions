import { Router } from "express";
import Blog from '../models/blog.js'
import logger from "../utils/logger.js";

const BlogsRouter = Router()

BlogsRouter.get('/', (request, response, next) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
        .catch((error) => {
            next(error)
        })
})

BlogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
        .catch((error) => {
            next(error)
        })
})

export default BlogsRouter