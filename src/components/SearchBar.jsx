import React from 'react';

function SearchBar() {
  return (
    <div>
      <input
        placeholder="Buscar receita"
        type="text"
        data-testid="search-input"
      />
      <label htmlFor="ingredient">
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          id="ingredient"
          name="search"
          value="ingredient"
        />
        Ingredientes
      </label>
      <label htmlFor="name">
        <input
          data-testid="name-search-radio"
          type="radio"
          id="name"
          name="search"
          value="name"
        />
        Nome
      </label>
      <label htmlFor="first-letter">
        <input
          data-testid="first-letter-search-radio"
          type="radio"
          id="first-letter"
          name="search"
          value="first-letter"
        />
        Primeira Letra
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
