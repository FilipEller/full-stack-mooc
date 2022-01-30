import React, { useState } from 'react'
import NewPersonForm from './components/AddNumberForm'
import NumberList from './components/NumberList.js'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);

  const addPerson = (person) => {
    setPersons(persons.concat(person))
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <NewPersonForm persons={persons} addPerson={addPerson} />
      <NumberList persons={persons} />
    </div>
  )
}

export default App