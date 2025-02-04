import { Router } from 'express';
import { getAllButSSN, addPatient } from '../services/patients.js';
import { v1 as uuid } from 'uuid';
import { toNewPatient } from '../utils/parseNewPatient.js';
import { Patients } from '../types/patients.js';

const patientsRouter = Router();

patientsRouter.get('/', (_req, res) => {
    res.send(getAllButSSN());
});

patientsRouter.post('/', (req, res) => {
    let newPatient = toNewPatient(req.body) as Patients;
    newPatient.id = uuid();
    res.json(addPatient(newPatient));
});

export default patientsRouter;