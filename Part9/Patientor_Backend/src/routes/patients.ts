import { Router } from 'express';
import { getAllButSSN } from '../services/patients.js';

const patientsRouter = Router();

patientsRouter.get('/', (_req, res) => {
    res.send(getAllButSSN());
});

export default patientsRouter;