import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const addPerson = (e) => {
    e.preventDefault()
    const newPerson = { name: newName };
    const nameExists = persons.map(p => p.name).some(n => n === newName)
    if (nameExists) {
      alert(`${newName} is already added to the phonebook.`)
    } else {
      setPersons(persons.concat(newPerson));
      setNewName('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          <label>Name:</label>
          <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(p => <li key={p.name}>{p.name}</li>)}
      </ul>
    </div>
  )
}

export default App