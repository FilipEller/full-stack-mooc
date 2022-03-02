import React, { useState } from 'react';
import SearchFilter from './SearchFilter'
import { Center, Paper, Button, createStyles } from '@mantine/core';

const NumberList = ({ persons, deletePerson }) => {
  const [filter, setFilter] = useState('')

  const personsShown = persons.filter(p => p.name.toLowerCase().includes(filter))

  const onDelete = (person) => {
    if (window.confirm(`Do you want to delete ${person.name}?`)) {
      deletePerson(person)
    }
  }

  const useStyles = createStyles((theme, _params, getRef) => {
    return {
      person: {
        backgroundColor: theme.colors.gray[0],
        margin: "15px 0",
        display: "flex",
        justifyContent: "space-between"
      },
      info: {
        margin: "0 10px",
        fontSize: "1em"
      }
    }
  })

  const { classes } = useStyles();

  return (
    <div>
      <Center>
        <h2>Numbers</h2>
      </Center>
      <SearchFilter setFilter={setFilter} />
      <div>
        {personsShown.map(p => (
          <Paper key={p.id}
            padding="md" shadow="md" radius="md"
            className={classes.person}>

            <Center>
              <div className={classes.info}>
                {p.name} {p.number}
              </div>
            </Center>
            <Button
              variant="gradient"
              gradient={{ from: 'grape', to: 'cyan' }}
              radius="xl"
              onClick={() => onDelete(p)}>
              Delete
            </Button>

          </Paper>
        ))}
      </div>
    </div>
  )
};

export default NumberList;
