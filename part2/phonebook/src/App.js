import React, { useState, useEffect } from 'react'
import NewPersonForm from './components/AddNumberForm'
import NumberList from './components/NumberList'
import Notification from './components/Notification'
import personService from './services/persons'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    personService
      .readAll()
      .then(res => {
        setPersons(res.data)
      })
  }, [])

  const displayNotification = (newMessage) => {
    setMessage(newMessage);
    setTimeout(() => {
      setMessage('')
    }, 3000)
  }


  const createPerson = (person) => {
    personService
      .create(person)
      .then(res => {
        const person = res.data
        setPersons(persons.concat(person))
        displayNotification(`Added ${person.name}`)
      })
  }

  const updatePerson = (person) => {
    personService
      .update(person, person.id)
      .then(res => {
        setPersons(persons.map(p => p.id !== person.id ? p : res.data))
        displayNotification(`Updated ${person.name}`)
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
      <Notification message={message}/>
      <NewPersonForm persons={persons} createPerson={createPerson} updatePerson={updatePerson} />
      <NumberList persons={persons} deletePerson={deletePerson} />
    </div>
  )
}

export default App