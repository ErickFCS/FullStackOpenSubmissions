import express from 'express';
import calculateBmi from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
    res.send("Hello Full Stack");
});

app.get('/bmi', (req, res): undefined => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    if (isNaN(height) || isNaN(weight)) {
        res.send({ error: "malformatted parameters" });
        return;
    }
    const bmi = calculateBmi(height, weight);
    res.send({ height, weight, bmi });
});

const PORT = 3003;

app.listen(PORT, () => { console.log(`SERVER RUNNING IN PORT: ${PORT}`); });