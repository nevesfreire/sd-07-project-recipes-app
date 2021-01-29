import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from '../Context/Context';

function SearchBar({ theFetch }) {
  const { recipes } = useContext(RecipeContext);
  const [searchType, setSearchType] = useState();
  const [searchInput, setSearchInput] = useState();
  console.log(recipes);

  // function alertEmpty() {
  //   if (!recipes.meals) {
  //     alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  //   }
  // }

  function handleClick() {
    const um = 1;
    if (searchInput.length > um && searchType === 'first-letter') {
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
    theFetch(searchInput, searchType);
    if (!recipes.meals) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  }

  return (
    <div>
      <input
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
        onClick={ handleClick }
        type="button"
        data-testid="exec-search-btn"
      >
        Buscar
      </button>
    </div>);
}

SearchBar.propTypes = {
  theFetch: PropTypes.func.isRequired,
};

export default SearchBar;
