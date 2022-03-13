import React from 'react';
import { TextInput } from '@mantine/core';

const SearchFilter = ({ setFilter }) => {
  return (
    <TextInput
      type='text'
      label='Search for a person'
      id='search'
      size='md'
      onChange={e => setFilter(e.target.value.toLowerCase())}
      autoComplete='off'
      my='md'
    />
  );
};

export default SearchFilter;
