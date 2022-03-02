import React, { useState } from 'react'
import { TextInput, Center, Button, createStyles } from '@mantine/core'

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

  const useStyles = createStyles((theme, _params, getRef) => {
    return {
      form: {

      },
    }
  })

  const { classes } = useStyles();

  return (
    <div className={classes.form}>
      <Center>
        <h2>Add number</h2>
      </Center>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <TextInput type="text" id="name" value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="number">Number:</label>
          <input type="text" id="number" value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
        </div>
        <div>
          <Button
            variant="gradient"
            gradient={{ from: 'grape', to: 'cyan' }}
            radius="xl"
            type="submit">
            Add
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddNumberForm;
