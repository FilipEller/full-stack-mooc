interface ExerciseData {
  target: number;
  dailyExerciseHours: Array<number>;
}

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseArgs = (args: Array<string>): ExerciseData => {
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

const calculateExercises = (
  target: number,
  dailyExerciseHours: Array<number>
): Result => {
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter(hours => hours > 0).length;
  const average =
    dailyExerciseHours.reduce((sum, hours) => sum + hours) / periodLength;

  const success = average >= target;

  interface Ratings {
    rating: number;
    ratingDescription: string;
  }

  const getRating = (average: number, target: number): Ratings => {
    if (average >= target) {
      return { rating: 3, ratingDescription: 'well done, keep this going' };
    } else if (average >= 0.75 * target) {
      return {
        rating: 2,
        ratingDescription: 'not too bad but could be better',
      };
    } else {
      return { rating: 1, ratingDescription: 'what a disappointment' };
    }
  };

  let { rating, ratingDescription } = getRating(average, target);

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

const exerciseCalculator = () => {
  try {
    const { target, dailyExerciseHours } = parseArgs(process.argv);
    console.log(calculateExercises(target, dailyExerciseHours));
  } catch (error: unknown) {
    console.log('Execution failed.');
    if (error instanceof Error) {
      console.log('Error:', error.message);
    }
  }
};

exerciseCalculator();
