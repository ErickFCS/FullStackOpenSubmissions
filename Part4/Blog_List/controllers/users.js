import { Router } from 'express'
import User from '../models/user.js'
import bcrypt from 'bcrypt'

const UsersRouter = Router()

UsersRouter.get('/', async (request, response) => {
    const users = await User.find({}, { passwordHash: 0 })
    response.json(users)
})

UsersRouter.post('/', async (request, response, next) => {
    const { username, password, name } = request.body
    const passwordHash = password ? await bcrypt.hash(password, 10) : undefined
    const newUser = new User({ username, passwordHash, name })
    const savedUser = await newUser.save()
    response.sendStatus(201).json(savedUser)
})

UsersRouter.put('/:id', (request, response) => {

})

UsersRouter.delete('/:id', (request, response) => {

})

export default UsersRouter