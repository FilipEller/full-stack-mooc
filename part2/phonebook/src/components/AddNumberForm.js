import React, { useState } from 'react'
import { TextInput, Center, Button, Grid, Title } from '@mantine/core'

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
      <Title order={2} align="center" my="sm">Add a number</Title>
      <form onSubmit={onSubmit}>
        <TextInput
          type="text"
          label="Full name"
          placeholder="Your name"
          required
          id="name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          autoComplete="off"
          size="md"
          my="xs"
        />
        <Grid justify="space-between" align="flex-end" my="xs">
          <Grid.Col span={9}>
            <TextInput
              type="text"
              label="Phone number"
              placeholder="123-4567890"
              required
              id="number"
              value={newNumber}
              onChange={(e) => setNewNumber(e.target.value)}
              autoComplete="off"
              size="md"
            />
          </Grid.Col>
          <Grid.Col span={3}>
            <Center>
              <Button
                variant="gradient"
                gradient={{ from: 'violet', to: 'cyan'}}
                size="sm"
                radius="xl"
                type="submit">
                Add
              </Button>
            </Center>
          </Grid.Col>
        </Grid>
      </form>
    </div>
  );
};

export default AddNumberForm;
