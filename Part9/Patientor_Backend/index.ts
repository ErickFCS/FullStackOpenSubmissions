import express from 'express';

const app = express();

app.get('/api/ping', (_req, res) => {
    res.send("pong");
});

const PORT: number = 3003;

app.listen(PORT, () => { console.log(`server running in port ${PORT}`); });