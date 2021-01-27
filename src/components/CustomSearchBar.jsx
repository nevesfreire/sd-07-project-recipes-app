import React from 'react';
import PropTypes from 'prop-types';

export default function CustomSearchBar({ inputChange, buttonClick }) {
  return (
    <div>
      <label htmlFor="search-input">
        Buscar Receitas:
        <input
          data-testid="search-input"
          id="search-input"
          name="searchInput"
          type="text"
          onChange={ inputChange }
        />
      </label>
      <label htmlFor="ingredient-search-radio">
        Ingrediente:
        <input
          type="radio"
          id="ingredient-search-radio"
          name="searchRadio"
          value="i"
          data-testid="ingredient-search-radio"
          onChange={ inputChange }
        />
      </label>
      <label htmlFor="name-search-radio">
        Nome:
        <input
          type="radio"
          id="name-search-radio"
          name="searchRadio"
          value="s"
          data-testid="name-search-radio"
          onChange={ inputChange }
        />
      </label>
      <label htmlFor="first-letter-search-radio">
        Primeira letra:
        <input
          type="radio"
          id="first-letter-search-radio"
          name="searchRadio"
          value="f"
          data-testid="first-letter-search-radio"
          onChange={ inputChange }
        />
      </label>
      <button type="button" data-testid="exec-search-btn" onClick={ () => buttonClick() }>
        Buscar
      </button>
    </div>
  );
}

CustomSearchBar.propTypes = {
  inputChange: PropTypes.func.isRequired,
  buttonClick: PropTypes.func.isRequired,
};
