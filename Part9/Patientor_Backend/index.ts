import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors())

app.get('/api/ping', (_req, res) => {
    res.send("pong");
});

const PORT: number = 3001;

app.listen(PORT, () => { console.log(`server running in port ${PORT}`); });