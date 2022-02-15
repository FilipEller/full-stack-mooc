const express = require('express');
const app = express();
require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');
const db = require('./database');
const Person = require('./models/person');

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
});

morgan.token('body', (req, res) => req.method === 'POST' ? JSON.stringify(req.body) : '');
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.use(express.static('build'));
app.use(express.json());
app.use(cors());

let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

app.get('/info', (req, res) => {
  const numPeople = persons.length
  const date = new Date()
  res.send(`<div>The phonebook has info about ${numPeople} people<div><div>${date}<di>`)
});

app.get('/api/persons', async (req, res) => {
  const data = await Person.find({});
  res.json(data);
});

app.post('/api/persons', async (req, res) => {
  const { name, number } = req.body;
  // const generateID = () => Math.floor(Math.random() * 10000000) + 1;

  if (!name) {
    return res.status(400).send({
      error: 'name missing'
    })
  } else if (!number) {
    return res.status(400).send({
      error: 'number missing'
    })
  } else if (persons.some(p => p.name === name)) {
    return res.status(400).send({
      error: 'name must be unique'
    })
  }

  const newPerson = new Person({
    // id: generateID(),
    name: name,
    number: number,
  })

  const data = await newPerson.save();
  res.json(data)
});

app.get('/api/persons/:id', async (req, res) => {
  const person = persons.find(p => p.id === Number(req.params.id));
  if (person) {
    res.send(person);
  } else {
    res.status(404).send({ error: `no person with id ${req.params.id}` })
  }
});

app.delete('/api/persons/:id', async (req, res) => {
  await Person.findByIdAndRemove(req.params.id)
    .catch(error => {
      console.log(error.message)
    });
  // const id = Number(req.params.id);
  // persons = persons.filter(p => p.id !== id);
  res.status(204).end()
});

app.use((req, res) => {
  res.status(404).send({
    error: 'unknown endpoint'
  })
})