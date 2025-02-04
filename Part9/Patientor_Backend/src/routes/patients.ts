import { getAllButSSN, addPatient } from '../services/patients.js';
import { newPatientMiddleware } from '../utils/newPatientSchema.js';
import { Patients, NewPatient } from '../types/patients.js';
import { Router, Request, Response } from 'express';

const patientsRouter = Router();

patientsRouter.get('/', (_req, res) => {
    res.json(getAllButSSN());
});

patientsRouter.post('/', newPatientMiddleware, (req: Request<unknown, unknown, NewPatient>, res: Response<Patients>) => {
    res.json(addPatient(req.body));
});

export default patientsRouter;