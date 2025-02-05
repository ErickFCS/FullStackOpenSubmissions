import { z } from 'zod';


export interface recordData {
    id: number
    weather: string;
    visibility: string;
    date: string;
    comment: string;
}

export type newRecordData = Omit<recordData, 'id'>

export const recordDataSchema = z.object({
    id: z.number(),
    weather: z.string(),
    visibility: z.string(),
    date: z.string(),
    comment: z.string(),
});