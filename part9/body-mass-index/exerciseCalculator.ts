import calculateExercises from './utils/calculateExercises'

interface Data {
  target: number;
  dailyExerciseHours: Array<number>;
}

const parseInput = (args: Array<string>): Data => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.slice(3).filter(x => isNaN(Number(x))).length > 0)
    throw new Error('Invalid input. Arguments must be numbers.');

  const target = Number(args[2]);
  const dailyExerciseHours = args.slice(3).map(x => Number(x));

  return {
    target,
    dailyExerciseHours,
  };
};



const main = () => {
  try {
    const { target, dailyExerciseHours } = parseInput(process.argv);
    console.log(calculateExercises(target, dailyExerciseHours));
  } catch (error: unknown) {
    console.log('Execution failed.');
    if (error instanceof Error) {
      console.log('Error:', error.message);
    }
  }
};

main();
