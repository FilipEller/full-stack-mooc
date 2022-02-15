import React from 'react';

const SearchFilter = ({ setFilter }) => {
  return (
    <div>
      <label htmlFor="search">Filter shown numbers with</label>
      <input id="search" type="text" onChange={(e) => setFilter(e.target.value)} />
    </div>
  );
};

export default SearchFilter;
