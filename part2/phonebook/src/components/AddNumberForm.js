import React, { useState } from 'react'

const AddNumberForm = ({ persons, createPerson, updatePerson }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    const newPerson = { name: newName, number: newNumber };
    const nameExists = persons.some(p => p.name === newName)
    const numberExists = persons.some(p => p.number === newNumber)
    if (nameExists) {
      if (window.confirm(`${newName} is already added to the phonebook. Do you want to replace the old number with a new one?`)) {
        const person = persons.find(p => p.name === newPerson.name)
        const updatedPerson = { ...person, number: newNumber }
        updatePerson(updatedPerson)
        setNewName('');
        setNewNumber('');
      }
    } else if (numberExists) {
      alert(`${newNumber} is already added to the phonebook.`);
    } else {
      createPerson(newPerson);
      setNewName('');
      setNewNumber('');
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
