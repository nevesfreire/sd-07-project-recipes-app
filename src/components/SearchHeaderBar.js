import React from 'react';

function SearchHeaderBar() {
  return (
    <div>
      <label htmlFor="search-input">
        <input id="search-input" data-testid="search-input" type="text" />
      </label>

      <div>
        <label htmlFor="radio">

          <input
            id="radio"
            name="radio"
            data-testid="ingredient-search-radio"
            type="radio"
          />
          Ingrediente

          <input
            id="radio"
            name="radio"
            data-testid="name-search-radio"
            type="radio"
          />
          Nome

          <input
            id="radio"
            name="radio"
            data-testid="first-letter-search-radio"
            type="radio"
          />
          Primeira letra
        </label>

        <button
          data-testid="exec-search-btn"
          type="button"
        >
          Buscar
        </button>
      </div>
    </div>
  );
}

export default SearchHeaderBar;
