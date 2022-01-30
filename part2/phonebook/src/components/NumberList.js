import React, { useState } from 'react';
import SearchFilter from './SearchFilter'

const NumberList = ({ persons }) => {
  const [filter, setFilter] = useState('')

  const personsShown = persons.filter(p => p.name.toLowerCase().includes(filter))

  return (
    <div>
      <h2>Numbers</h2>
      <SearchFilter setFilter={setFilter} />
      <ul>
        {personsShown.map(p => <li key={p.id}>{p.name} {p.number}</li>)}
      </ul>
    </div>
  )
};

export default NumberList;
