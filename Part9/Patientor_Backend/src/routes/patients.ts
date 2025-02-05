import { getAllButSSN, addPatient, getPatient } from '../services/patients.js';
import { newPatientMiddleware } from '../utils/newPatientSchema.js';
import { Patients, NewPatient } from '../types/patients.js';
import { Router, Request, Response } from 'express';
import { z } from 'zod';

const patientsRouter = Router();

patientsRouter.get('/', (_req, res) => {
    res.json(getAllButSSN());
});

patientsRouter.get('/:id', (req, res) => {
    const patientId = z.string().parse(req.params.id);
    res.json(getPatient(patientId));
});

patientsRouter.post('/', newPatientMiddleware, (req: Request<unknown, unknown, NewPatient>, res: Response<Patients>) => {
    res.json(addPatient(req.body));
});

export default patientsRouter;