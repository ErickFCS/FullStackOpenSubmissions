import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

interface BodyMassIndex {
    target: number,
    daily_exercises: number[]
}

const app = express();

app.use(express.json());

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

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const bodyMassIndex: BodyMassIndex = req.body;
    if (!bodyMassIndex.target || !bodyMassIndex.daily_exercises) {
        res.send({ error: "parameters missing" });
        return;
    }
    const target: number = Number(bodyMassIndex.target);
    const dailyExercises: number[] = bodyMassIndex.daily_exercises.map(Number);
    if (isNaN(target) || dailyExercises.some(isNaN)) {
        res.send({ error: "malformatted parameters" });
        return;
    }
    const result = calculateExercises(dailyExercises, target);
    res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => { console.log(`SERVER RUNNING IN PORT: ${PORT}`); });