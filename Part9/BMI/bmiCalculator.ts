

const calculateBmi = (height: number, mass: number): string => {
    const bmi: number = mass * 10000 / (height * height);
    if (bmi < 18.5) return 'underweight';
    if (bmi < 25) return 'normal weight';
    if (bmi < 30) return 'overweight';
    return 'obese';
}

console.log(calculateBmi(180, 74));