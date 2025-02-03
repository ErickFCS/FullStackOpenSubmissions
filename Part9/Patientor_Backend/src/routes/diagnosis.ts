import { Router } from 'express'
import { getAll } from '../services/diagnosis.js'

const diagnosisRouter = Router()

diagnosisRouter.get('/', (_req, res) => {
    res.status(200).send(getAll())
})

export default diagnosisRouter