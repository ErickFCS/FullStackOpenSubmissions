import { Gender, NewPatient } from "../types/patients.js";

const isString = (param: unknown): param is string => {
    return typeof param === 'string' || param instanceof String;
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map((e) => (e.toString())).includes(param);
};

const parseSsn = (ssn: unknown): string => {
    if (!isString(ssn)) throw new Error("Invalid ssn");
    return ssn;
};

const parseName = (name: unknown): string => {
    if (!isString(name)) throw new Error("Invalid name");
    return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
    if (!isString(dateOfBirth)) throw new Error("Invalid dateOfBirth");
    return dateOfBirth;
};

const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)) throw new Error("Invalid gender");
    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    if (!isString(occupation)) throw new Error("Invalid occupation");
    return occupation;
};

export const toNewPatient = (obj: unknown): NewPatient => {
    if (!obj || typeof obj !== 'object') throw new Error("Missing object");
    if (!(
        'ssn' in obj &&
        'name' in obj &&
        'dateOfBirth' in obj &&
        'gender' in obj &&
        'occupation' in obj
    )) throw new Error("Missing fields");
    const newPatient: NewPatient = {
        name: parseName(obj.name),
        dateOfBirth: parseDateOfBirth(obj.dateOfBirth),
        ssn: parseSsn(obj.ssn),
        gender: parseGender(obj.gender),
        occupation: parseOccupation(obj.occupation),
    };
    return newPatient;
};
