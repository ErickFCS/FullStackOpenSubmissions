export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other'
}

export interface Patients {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
}

export type NewPatient = Omit<Patients, 'id'>;