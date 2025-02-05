import axios from 'axios';
import { recordDataSchema, recordData, newRecordData } from '../types';
import { z } from 'zod';

const baseUrl = '/api/diaries';

const getAll = async (): Promise<recordData[]> => {
    return axios
        .get(baseUrl)
        .then((res) => {
            try {
                const data = z.array(recordDataSchema).parse(res.data);
                return Promise.resolve(data as recordData[]);
            }
            catch {
                return Promise.reject('Invalid server response');
            }
        })
        .catch((err) => {
            console.error(err);
            if (!axios.isAxiosError(err)) return Promise.reject('Unknown error');
            return Promise.reject(err.response?.data);
        });
};

const newOne = async (data: newRecordData): Promise<recordData> => {
    return axios
        .post(baseUrl, data)
        .then((res) => {
            const data = recordDataSchema.parse(res.data);
            return Promise.resolve(data as recordData);
        })
        .catch((err) => {
            console.error(err);
            if (!axios.isAxiosError(err)) return Promise.reject('Unknown error');
            return Promise.reject(err.response?.data);
        });
};

export default { getAll, newOne };