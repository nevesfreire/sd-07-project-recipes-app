import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import FoodAppContext from '../context/FoodAppContext';

function SearchBar({ title }) {
  const { handlerChange, handlerClick } = useContext(FoodAppContext);
  console.log(title);
  return (
    <div>
      <input
        name="term"
        placeholder="Buscar receita"
        type="text"
        data-testid="search-input"
        onChange={ handlerChange }
      />
      <label htmlFor="ingredient">
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          id="ingredient"
          name="type"
          value="i"
          onChange={ handlerChange }
        />
        Ingredientes
      </label>
      <label htmlFor="name">
        <input
          data-testid="name-search-radio"
          type="radio"
          id="name"
          name="type"
          value="s"
          onChange={ handlerChange }
        />
        Nome
      </label>
      <label htmlFor="first-letter">
        <input
          data-testid="first-letter-search-radio"
          type="radio"
          id="first-letter"
          name="type"
          value="f"
          onChange={ handlerChange }
        />
        Primeira Letra
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handlerClick }
        value={ title }
      >
        Buscar
      </button>
    </div>
  );
}

SearchBar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SearchBar;
