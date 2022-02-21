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

app.get('/info', async (req, res) => {
  const persons = await Person.find({});
  const numPeople = persons.length
  const date = new Date()
  res.send(`<h1>Phonebook</h1><div>The phonebook has info about ${numPeople} people<div><div>${date}<di>`)
});

// READ all Persons
app.get('/api/persons', async (req, res) => {
  const persons = await Person.find({});
  res.json(persons);
});

// CREATE Person
app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body;
  // const generateID = () => Math.floor(Math.random() * 10000000) + 1;

  /* if (!name) {
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
  }*/

  const newPerson = new Person({ name, number })

  newPerson.save()
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      next(err);
    })

});

// READ Person
app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).json({
          error: `no person with id ${req.params.id}`
        })
      }
    })
    .catch(err => next(err));
});

// DELETE Person
app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(data => {
      res.status(204).end()
    })
    .catch(err => next(err));
});

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body;

  Person.findByIdAndUpdate(req.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' },
  )
    .then(updated => {
      res.json(updated);
    })
    .catch(err => next(err));
});

// 404
app.use((req, res) => {
  res.status(404).send({
    error: 'unknown endpoint'
  })
})

// ERRORS
app.use((err, req, res, next) => {
  console.log(err.message);
  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'malformatted id' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }

  res.status(500).end()
})