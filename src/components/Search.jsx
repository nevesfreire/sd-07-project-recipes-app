import React, { useContext } from 'react';
import { Input } from '@material-ui/core';
import context from '../contextApi/context';

function Search({ textInput }) {
  const { search, HandleTextChange } = useContext(context);
  const { change } = search;

  return change ? (
    <Input
      placeholder="Faça sua pesquisa"
      data-testid="search-input"
      type="search"
      autoFocus
      onChange={ HandleTextChange }
      ref={ textInput }
    />
  ) : null;
}

export default Search;
