import logger from './logger.js'

const requestLogger = (request, response, next) => {
    logger.info(request.method)
    logger.info(request.path)
    logger.info(request.body)
    logger.info('---')
    next()
}


const unknownEndpoint = (request, response) => {
    response.status(404).json({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
        return response.status(400).json({ error: 'expected `username` to be unique' })
    } else {
        return response.status(400).json({ error: error })
    }
    next()
}


export { requestLogger, unknownEndpoint, errorHandler }
