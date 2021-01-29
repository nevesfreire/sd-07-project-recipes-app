import React, { useState } from 'react';

function HeaderSearch() {
  const [textSearch, setTextSearch] = useState('');
  const [radioValue, setRadioValue] = useState('');
  console.log(radioValue)

  return (
    <section>
      <div>
        <input
          type="text"
          name="searchInput"
          id="searchInput"
          placeholder="Buscar Receita"
          data-testid="search-input"
          onChange={ (event) => setTextSearch(event.target.value) }
        />
      </div>
      <div>
        <label htmlFor="ingredientSearch">
          <input
            type="radio"
            name="searchFilter"
            id="ingredientSearch"
            data-testid="ingredient-search-radio"
            onClick={ (event) => setRadioValue(event.target.id) }
          />
          Ingrediente
        </label>
        <label htmlFor="nameSearch">
          <input
            type="radio"
            name="searchFilter"
            id="nameSearch"
            data-testid="name-search-radio"
            onClick={ (event) => setRadioValue(event.target.id) }
          />
          Nome
        </label>
        <label htmlFor="firstLetterSearch">
          <input
            type="radio"
            name="searchFilter"
            id="firstLetterSearch"
            data-testid="first-letter-search-radio"
            onClick={ (event) => setRadioValue(event.target.id) }
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
