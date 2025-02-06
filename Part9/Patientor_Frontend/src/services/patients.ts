import axios from 'axios';
import { Patient, PatientFormValues, NewEntry } from '../types';

import { apiBaseUrl } from '../constants';

const getAll = async () => {
    const { data } = await axios.get<Patient[]>(
        `${apiBaseUrl}/patients`
    );

    return data;
};

const getPatient = async (patientId: string) => {
    const { data } = await axios.get<Patient | null>(
        `${apiBaseUrl}/patients/${patientId}`
    );

    return data;
};

const create = async (object: PatientFormValues) => {
    const { data } = await axios.post<Patient>(
        `${apiBaseUrl}/patients`,
        object
    );

    return data;
};

const createEntry = async (patientId: string, body: NewEntry) => {
    const { data } = await axios.post(
        `${apiBaseUrl}/patients/${patientId}/entries`,
        body
    );

    return data;
};

export default {
    getAll, create, getPatient, createEntry
};

