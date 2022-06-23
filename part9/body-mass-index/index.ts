import express from 'express';
import calculateBmi from './utils/calculateBmi';
import calculateExercises from './utils/calculateExercises';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height: heightInput, weight: weightInput } = req.query;

  const height = Number(heightInput);
  const weight = Number(weightInput);

  if (isNaN(height) || isNaN(weight)) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const bmi = calculateBmi(height, weight);
  return res.json({ height, weight, bmi });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, daily_exercises } = req.body;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (!target || !daily_exercises) {
    return res.status(400).json({ error: 'parameters missing' });
  }

  if (isNaN(Number(target))) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (!daily_exercises.length) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  for (const hours of daily_exercises) {
    if (isNaN(Number(hours))) {
      return res.status(400).json({ error: 'malformatted parameters' });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculateExercises(target, daily_exercises);
  return res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
