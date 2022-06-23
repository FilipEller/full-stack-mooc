const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100) ** 2;
  switch (true) {
    case bmi < 18.5:
      return 'Underweight (thinness)';
    case bmi < 25:
      return 'Normal (healthy weight)';
    default:
      return 'Overweight (obesity)';
  }
};

export default calculateBmi