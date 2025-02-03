import cors from 'cors';
import diagnosisRouter from './routes/diagnosis.js';
import express from 'express';
import pingRouter from './routes/ping.js';

const app = express();

app.use(cors())
app.use('/api/ping', pingRouter);
app.use('/api/diagnosis', diagnosisRouter);

const PORT: number = 3001;
app.listen(PORT, () => { console.log(`server running in port ${PORT}`); });