import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

function SearchInput() {
  const { setSearchInput } = useContext(RecipesContext);
  const handlerChange = ({ target }) => {
    setSearchInput(target.value);
  };
  return (
    <input onChange={ handlerChange } data-testid="search-input" type="text" />
  );
}

export default SearchInput;
