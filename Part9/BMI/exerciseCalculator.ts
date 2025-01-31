

interface Exercise_report {
    average: number,
    periodLength: number,
    rating: number,
    ratingDescription: string,
    success: boolean,
    target: number,
    trainingDays: number
}

const calculateExercises = (daily_exercise_hours: number[], target: number): Exercise_report => {
    const average: number = daily_exercise_hours.reduce((p, a) => (p + a)) / daily_exercise_hours.length;
    /*
        1 --> if average < target/2
        2 --> if average > target/2
        3 --> if average > target
    */
    const rating: number = 1 + Number(average > target / 2) + Number(average > target);
    const ratingDescriptions: string[] = [
        'progress is progress, not matter how small',
        'well done, but there is still space for improvement',
        'Congratulations, you have reached your target!'
    ];
    return {
        average: average,
        periodLength: daily_exercise_hours.length,
        rating: rating,
        ratingDescription: ratingDescriptions[rating - 1],
        success: average >= target,
        target: target,
        trainingDays: daily_exercise_hours.reduce((p, a) => (a > 0 ? p + 1 : p), 0),
    }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));