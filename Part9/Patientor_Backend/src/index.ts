import cors from 'cors';
import diagnosisRouter from './routes/diagnosis.js';
import express from 'express';
import patientsRouter from './routes/patients.js';
import pingRouter from './routes/ping.js';
import { errorMiddleware } from './utils/errorMiddleware.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/ping', pingRouter);
app.use('/api/diagnosis', diagnosisRouter);
app.use('/api/patients', patientsRouter);
app.use(errorMiddleware);

const PORT: number = 3001;
app.listen(PORT, () => { console.log(`server running in port ${PORT}`); });