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


  const createPerson = (person) => {
    personService
      .create(person)
      .then(res => {
        setPersons(persons.concat(res.data))
      })
  }

  const updatePerson = (person) => {
    personService
      .update(person, person.id)
      .then(res => {
        setPersons(persons.map(p => p.id !== person.id ? p : res.data))
      })
  }

  const deletePerson = (person) => {
    personService
      .deleteById(person.id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== person.id))
      })
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <NewPersonForm persons={persons} addPerson={createPerson} updatePerson={updatePerson} />
      <NumberList persons={persons} deletePerson={deletePerson} />
    </div>
  )
}

export default App