import React from 'react';

const CountryList = ({ countries, setQuery }) => {
  return <ul>
    {countries.map(country =>
      <li key={country.name.common}>
        {country.name.common}
        <button onClick={() => setQuery(country.name.common)}>Show</button>
      </li>
    )}
  </ul>;
};

export default CountryList;
