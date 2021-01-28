import React, { useState } from 'react';

const SearchBar = () => {
  const [searchBarData, setSearchBarData] = useState({ text: '', option: '' });

  const radioClick = ({ target }) => setSearchBarData({ ...searchBarData, option: target.id });

  return (
    <form>
      <input
        type="text"
        data-testid="search-input"
        value={ searchBarData.text }
        onChange={ ({ target }) => setSearchBarData({ ...searchBarData, text: target.value }) }
      />
      <label
        htmlFor="ingrediente"
      >
        Ingrediente
        <input
          name="options"
          id="ingrediente"
          type="radio"
          data-testid="ingredient-search-radio"
          onClick={ radioClick }
        />
      </label>
      <label htmlFor="nome">
        Nome
        <input
          name="options"
          id="nome"
          type="radio"
          data-testid="name-search-radio"
          onClick={ radioClick }
        />
      </label>
      <label htmlFor="primeira letra">
        Primeira letra
        <input
          name="options"
          id="primeira letra"
          type="radio"
          data-testid="first-letter-search-radio"
          onClick={ radioClick }
        />
      </label>
      <button
        type="button"
      >
        Buscar
      </button>
    </form>

  );
};

export default SearchBar;
