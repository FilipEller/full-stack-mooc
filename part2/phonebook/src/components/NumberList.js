import React, { useState } from 'react';

const NumberList = ({persons}) => {
  const [personsShown, setPersonsShown] = useState(persons)

  const filterPersons = (filter) => {
    const filtered = persons.filter(p => p.name.toLowerCase().includes(filter))
    setPersonsShown(filtered)
  }

  return (
    <div>
      <h2>Numbers</h2>
      <div>
        <label htmlFor="search">Filter shown with</label>
        <input id="search" type="text" onChange={(e) => filterPersons(e.target.value)}/>
      </div>
      <ul>
        {personsShown.map(p => <li key={p.id}>{p.name} {p.number}</li>)}
      </ul>
    </div>
  )
};

export default NumberList;
