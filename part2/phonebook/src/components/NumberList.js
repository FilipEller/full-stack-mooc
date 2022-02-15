import React, { useState } from 'react';
import SearchFilter from './SearchFilter'

const NumberList = ({ persons, deletePerson }) => {
  const [filter, setFilter] = useState('')

  const personsShown = persons.filter(p => p.name.toLowerCase().includes(filter))

  const onDelete = (person) => {
    if (window.confirm(`Do you want to delete ${person.name}?`)) {
      deletePerson(person)
    }
  }

  return (
    <div>
      <h2>Numbers</h2>
      <SearchFilter setFilter={setFilter} />
      <ul>
        {personsShown.map(p => <li key={p.id}>{p.name} {p.number} <button onClick={() => onDelete(p)}>delete</button></li>)}
      </ul>
    </div>
  )
};

export default NumberList;
