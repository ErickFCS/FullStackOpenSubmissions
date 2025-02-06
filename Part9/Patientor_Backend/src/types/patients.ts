import { z } from 'zod';
import { Diagnosis } from './diagnosis';

export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other'
}

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
}

const baseEntrySchema = z.object({
    id: z.string().optional(),
    description: z.string(),
    date: z.string(),
    specialist: z.string(),
    diagnosisCodes: z.array(z.string()).optional()
})

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

const healthCheckEntrySchema = baseEntrySchema.extend({
    type: z.literal("HealthCheck"),
    healthCheckRating: z.nativeEnum(HealthCheckRating),
})

interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    description: string;
    sickLeave?: {
        startDate: string;
        endDate: string;
    };
}

const occupationalHealthcareEntrySchema = baseEntrySchema.extend({
    type: z.literal("OccupationalHealthcare"),
    description: z.string(),
    sickLeave: z.object({
        startDate: z.string(),
        endDate: z.string(),
    }).optional()
})

interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    description: string;
    discharge: {
        date: string;
        criteria: string;
    };
}

const hospitalEntrySchema = baseEntrySchema.extend({
    type: z.literal("Hospital"),
    description: z.string(),
    discharge: z.object({
        date: z.string(),
        criteria: z.string(),
    })
})

export type Entry = HealthCheckEntry | OccupationalHealthcareEntry | HospitalEntry;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type NewEntry = UnionOmit<Entry, 'id'>

export const entrySchema = z.union([healthCheckEntrySchema, occupationalHealthcareEntrySchema, hospitalEntrySchema]);

export const newEntrySchema = entrySchema;

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
