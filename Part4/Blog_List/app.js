import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import logger from './utils/logger.js'
import config from './utils/config.js'
import BlogsRouter from './controllers/blogs.js'
import { requestLogger, unknownEndpoint, errorHandler } from './utils/middleware.js'

const app = express()
mongoose
    .connect(config.URI)
    .then(() => {
        logger.info("connection to mongodb successed")
    })
    .catch((error) => {
        logger.error("connection to mongodb failed", error)
    })
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(cors())
app.use(express.static('dist'));
app.use(express.json())
app.use(requestLogger)

app.use("/api/blogs", BlogsRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

export default app