import express from 'express';
import calculateBmi from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
    res.send("Hello Full Stack");
});

app.get('/bmi', (req, res): any => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    if (isNaN(height) || isNaN(weight))
        return res.send({ error: "malformatted parameters" });
    const bmi = calculateBmi(height, weight);
    return res.send({ height, weight, bmi });
});

const PORT = 3003;

app.listen(PORT, () => { console.log(`SERVER RUNNING IN PORT: ${PORT}`) });