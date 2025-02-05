import { z } from 'zod';

export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other'
}

export interface Entry {
    name: string;
}

const entrySchema = z.object({
    name: z.string()
});

export interface Patients {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
}

export type NewPatient = Omit<Patients, 'id'>;

export const newPatientSchema = z.object({
    name: z.string(),
    dateOfBirth: z.string(),
    ssn: z.string(),
    gender: z.nativeEnum(Gender),
    occupation: z.string(),
    entries: z.array(entrySchema).default([])
});