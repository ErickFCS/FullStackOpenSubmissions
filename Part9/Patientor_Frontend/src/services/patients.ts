import axios from 'axios';
import { Patient, PatientFormValues, NewEntry, entrySchema, Entry } from '../types';

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

const createEntry = async (patientId: string, data: NewEntry) => {
    return axios
        .post(`${apiBaseUrl}/patients/${patientId}/entries`, data)
        .then((res) => {
            const data = entrySchema.parse(res.data);
            return Promise.resolve(data as Entry);
        })
        .catch((err) => {
            console.error(err)
            if (axios.isAxiosError(err)) {
                return Promise.reject(err.message);
            } else {
                return Promise.reject('unknown error');
            }
        })

}

export default {
    getAll, create, getPatient, createEntry
};

