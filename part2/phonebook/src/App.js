import React, { useState, useEffect } from 'react'
import AddNumberForm from './components/AddNumberForm'
import NumberList from './components/NumberList'
import Notification from './components/Notification'
import personService from './services/persons'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    personService
      .readAll()
      .then(res => {
        setPersons(res.data)
      })
  }, [])

  const displayNotification = (newMessage, success) => {
    setMessage(newMessage);
    setSuccess(success)
    setTimeout(() => {
      setMessage('')
    }, 3000)
  }


  const createPerson = ({name, number}) => {
    personService
      .create({name, number})
      .then(res => {
        const person = res.data
        setPersons(persons.concat(person))
        displayNotification(`Added ${name}.`, true)
      })
      .catch(error => {
        console.log(error)
        console.log(error.response)
        console.log(error.response.data)
        displayNotification(`Could not add ${name}: ${error.response.data.error}.`, false)
      })
  }

  const updatePerson = (person) => {
    personService
      .update(person, person.id)
      .then(res => {
        setPersons(persons.map(p => p.id !== person.id ? p : res.data))
        displayNotification(`Updated ${person.name}.`, true)
      })
      .catch(error => {
        setPersons(persons.filter(p => p.id !== person.id))
        displayNotification(`${person.name} was already removed.`, false)
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
      <Notification message={message} success={success} />
      <AddNumberForm persons={persons} createPerson={createPerson} updatePerson={updatePerson} />
      <NumberList persons={persons} deletePerson={deletePerson} />
    </div>
  )
}

export default App