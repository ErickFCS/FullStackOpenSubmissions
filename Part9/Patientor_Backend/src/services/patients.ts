import { Patients } from '../types/patients.js';
import data from '../../data/patients.js';

export const getAll = (): Patients[] => {
    return data;
};

export const getAllButSSN = (): Omit<Patients, 'ssn'>[] => {
    return data.map(({ id, name, dateOfBirth, gender, occupation }) => (
        { id, name, dateOfBirth, gender, occupation }
    ));
};