import React from 'react';

function HeaderSearch() {
  return (
    <section>
      <div>
        <input
          type="text"
          name="searchInput"
          id="searchInput"
          placeholder="Buscar Receita"
          data-testid="search-input"
        />
      </div>
      <div>
        <label htmlFor="ingredientSearch">
          <input
            type="radio"
            name="searchFilter"
            id="ingredientSearch"
            data-testid="ingredient-search-radio"
          />
          Ingrediente
        </label>
        <label htmlFor="nameSearch">
          <input
            type="radio"
            name="searchFilter"
            id="nameSearch"
            data-testid="name-search-radio"
          />
          Nome
        </label>
        <label htmlFor="firstLetterSearch">
          <input
            type="radio"
            name="searchFilter"
            id="firstLetterSearch"
            data-testid="first-letter-search-radio"
          />
          Primeira letra
        </label>
      </div>

      <div>
        <button
          type="button"
          data-testid="exec-search-btn"
        >
          Buscar
        </button>
      </div>
    </section>
  );
}

export default HeaderSearch;
