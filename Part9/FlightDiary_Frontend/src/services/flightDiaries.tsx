import axios from 'axios';
import { recordDataSchema, recordData } from '../types';
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
            return Promise.reject('Unable to get all diaries');
        });
};

export default { getAll };