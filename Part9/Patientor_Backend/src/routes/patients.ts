import { getAllButSSN, addPatient, getPatient, addEntryToPatient } from '../services/patients.js';
import { newPatientMiddleware } from '../utils/newPatientSchema.js';
import { Patients, NewPatient, NewEntry, newEntrySchema } from '../types/patients.js';
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

patientsRouter.post('/:id/entries', (req, res) => {
    const patientId = z.string().parse(req.params.id);
    const newEntry: NewEntry = newEntrySchema.parse(req.body);
    res.json(addEntryToPatient(patientId, newEntry));
});

patientsRouter.post('/', newPatientMiddleware, (req: Request<unknown, unknown, NewPatient>, res: Response<Patients>) => {
    res.json(addPatient(req.body));
});

export default patientsRouter;