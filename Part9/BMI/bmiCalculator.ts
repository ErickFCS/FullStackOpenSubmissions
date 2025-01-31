

interface Arguments {
    height: number,
    mass: number
}

const parseArguments = (args: string[]): Arguments => {
    if (args.length < 4)
        throw new Error("missing arguments");
    if (isNaN(Number(args[2])) || isNaN(Number(args[3])))
        throw new Error("arguments must be numbers");
    return {
        height: Number(args[2]),
        mass: Number(args[3])
    }
}

const calculateBmi = (height: number, mass: number): string => {
    const bmi: number = mass * 10000 / (height * height);
    if (bmi < 18.5) return 'underweight';
    if (bmi < 25) return 'normal weight';
    if (bmi < 30) return 'overweight';
    return 'obese';
}

try {
    const { height, mass } = parseArguments(process.argv)
    console.log(calculateBmi(height, mass));
}
catch (error: unknown) {
    if (error instanceof Error)
        console.error(error.message)
    else
        console.error(error)
}

export default calculateBmi