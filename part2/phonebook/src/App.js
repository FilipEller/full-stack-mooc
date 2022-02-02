import React, { useState, useEffect } from 'react'
import NewPersonForm from './components/AddNumberForm'
import NumberList from './components/NumberList.js'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    personService
      .readAll()
      .then(res => {
        setPersons(res.data)
      })
  }, [])

  const addPerson = (person) => {
    personService
      .create(person)
      .then(res => {
        setPersons(persons.concat(res.data))
      })
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