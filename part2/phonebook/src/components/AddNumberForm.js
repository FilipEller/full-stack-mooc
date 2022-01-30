import React, { useState } from 'react'

const AddNumberForm = ({ persons, addPerson }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    const newPerson = { name: newName, number: newNumber };
    const nameExists = persons.map(p => p.name).some(n => n === newName)
    const numberExists = persons.map(p => p.number).some(n => n === newNumber)
    if (nameExists) {
      alert(`${newName} is already added to the phonebook.`)
    } else if (numberExists) {
      alert(`${newNumber} is already added to the phonebook.`)
    } else {
      addPerson(newPerson);
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Add number</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="number">Number:</label>
          <input type="text" id="number" value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
};

export default AddNumberForm;
