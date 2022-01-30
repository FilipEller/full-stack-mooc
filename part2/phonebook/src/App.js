import React, { useState, useEffect } from 'react'
import NewPersonForm from './components/AddNumberForm'
import NumberList from './components/NumberList.js'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() =>
    axios
      .get('http://localhost:3001/persons')
      .then(res => {
        setPersons(res.data)
      })
    , [])

  const addPerson = (person) => {
    setPersons(persons.concat({ ...person, id: persons.length + 1 }))
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