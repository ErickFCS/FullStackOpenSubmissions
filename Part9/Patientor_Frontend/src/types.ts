import { z } from 'zod';

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}
interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

const baseEntrySchema = z.object({
  id: z.string(),
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

export const entrySchema = z.union([healthCheckEntrySchema, occupationalHealthcareEntrySchema, hospitalEntrySchema]);

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Array<Entry>;
}

export type PatientFormValues = Omit<Patient, 'id' | 'entries'>;