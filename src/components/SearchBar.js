import React, { useState } from 'react';

function SearchBar({ drinkFetch }) {
  const [searchType, setSearchType] = useState();
  const [searchInput, setSearchInput] = useState();

  return (
    <div>
      <input
        value={ searchInput }
        onChange={ ({ target }) => setSearchInput(target.value) }
        data-testid="search-input"
      />
      <label htmlFor="ingredients">
        <input
          name="radios"
          onClick={ () => setSearchType('ingredients') }
          id="ingredients"
          type="radio"
          data-testid="ingredient-search-radio"
        />
        Ingrediente
      </label>
      <label htmlFor="name-search">
        <input
          name="radios"
          onClick={ () => setSearchType('name') }
          id="name-search"
          type="radio"
          data-testid="name-search-radio"
        />
        Nome
      </label>
      <label htmlFor="first-letter">
        <input
          name="radios"
          onClick={ () => setSearchType('first-letter') }
          id="first-letter"
          type="radio"
          data-testid="first-letter-search-radio"
        />
        Primeira letra
      </label>
      <button
        onClick={ () => drinkFetch(searchInput, searchType) }
        type="button"
        data-testid="exec-search-btn"
      >
        Buscar
      </button>
    </div>);
}

export default SearchBar;
