import calculateBmi from '../utils/calculateBmi';

interface Data {
  height: number;
  weight: number;
}

const parseInput = (args: Array<string>): Data => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');
  if (isNaN(Number(args[2])) || isNaN(Number(args[3])))
    throw new Error('Invalid input. Arguments must be numbers.');

  return {
    height: Number(args[2]),
    weight: Number(args[3]),
  };
};

const main = () => {
  try {
    const { height, weight } = parseInput(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    console.log('Execution failed.');
    if (error instanceof Error) {
      console.log('Error:', error.message);
    }
  }
};

main();
