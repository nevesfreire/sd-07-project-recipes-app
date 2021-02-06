import React from 'react';
import { useSelector } from 'react-redux';

function SearchBar() {
  const state = useSelector(({ header }) => header);
  const { barIsShowing } = state;

  if (barIsShowing) {
    return (
      <form className="search-bar">
        <input
          data-testid="search-input"
          type="text"
          className="search-bar_input"
          placeholder="Digite o que você procura aqui"
        />
      </form>
    );
  } return null;
}

export default SearchBar;
