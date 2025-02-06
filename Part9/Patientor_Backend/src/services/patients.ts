import { Entry, NewEntry, NewPatient, Patients } from '../types/patients.js';
import { v1 as uuid } from 'uuid';
import data from '../../data/patients.js';

export const getAll = (): Patients[] => {
    return data;
};

export const getAllButSSN = (): Omit<Patients, 'ssn' | 'entries'>[] => {
    return data.map(({ id, name, dateOfBirth, gender, occupation }) => (
        { id, name, dateOfBirth, gender, occupation }
    ));
};

export const getPatient = (patientId: string): Patients | null => {
    return data.find((e) => (e.id === patientId)) || null;
};

export const addEntryToPatient = (patientId: string, newEntry: NewEntry): Entry | null => {
    const index: number = data.findIndex((e) => (e.id === patientId));
    if (index === -1) return null;
    const entry: Entry = { ...newEntry, id: uuid() };
    data[index].entries.push(entry);
    return entry;
};

export const addPatient = (newPatient: NewPatient): Patients | undefined => {
    const newPatientWithId = { ...newPatient, id: uuid() };
    data.push(newPatientWithId);
    return newPatientWithId;
};