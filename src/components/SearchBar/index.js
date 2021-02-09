import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { FILTER_TYPES } from '../../services/recipeAPI';
import { setFilter, fetchRecipesByFilter } from '../../store/ducks/recipes';

const SearchBar = () => {
  const ORIGIN_SEARCH_BAR = 'searchbar';
  const [query, setQuery] = useState(FILTER_TYPES.INGREDIENT);
  const [inputQuery, setInputQuery] = useState('');
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const handleQuery = () => {
    if (query === FILTER_TYPES.FIRST_LETTER && inputQuery.length !== 1) {
      return alert('Sua busca deve conter somente 1 (um) caracter');
    }
    dispatch(setFilter(ORIGIN_SEARCH_BAR, query, inputQuery));
    dispatch(fetchRecipesByFilter(pathname, query, inputQuery));
  };

  return (
    <div>
      <form>
        <div>
          <label htmlFor="search-input">
            <input
              id="search-input"
              type="text"
              name="search-input"
              data-testid="search-input"
              onChange={ ({ target: { value } }) => { setInputQuery(value); } }
            />
          </label>
        </div>
        <div>
          <label htmlFor="ingredient">
            <input
              id="ingredient"
              type="radio"
              value="ingredient"
              name="search-radio"
              data-testid="ingredient-search-radio"
              checked={ query === FILTER_TYPES.INGREDIENT }
              onChange={ () => setQuery(FILTER_TYPES.INGREDIENT) }
            />
            Ingredient
          </label>
          <label htmlFor="name">
            <input
              id="name"
              type="radio"
              value="name"
              name="search-radio"
              data-testid="name-search-radio"
              checked={ query === FILTER_TYPES.NAME }
              onChange={ () => setQuery(FILTER_TYPES.NAME) }
            />
            Name
          </label>
          <label htmlFor="first-letter">
            <input
              id="first-letter"
              type="radio"
              value="first-letter"
              name="search-radio"
              data-testid="first-letter-search-radio"
              checked={ query === FILTER_TYPES.FIRST_LETTER }
              onChange={ () => setQuery(FILTER_TYPES.FIRST_LETTER) }
            />
            First Letter
          </label>
          <button
            data-testid="exec-search-btn"
            onClick={ handleQuery }
            type="button"
          >
            Buscar
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
