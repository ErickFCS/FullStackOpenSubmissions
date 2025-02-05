import { newPatientSchema } from "../types/patients.js";
import { Request, Response, NextFunction } from 'express';

export const newPatientMiddleware = (req: Request, _res: Response, next: NextFunction) => {
    try {
        newPatientSchema.parse(req.body);
        next();
    } catch (error: unknown) {
        next(error);
    }
};