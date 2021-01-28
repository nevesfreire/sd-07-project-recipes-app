import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import history from '../history/history';
import {
  getCurrenceRecipesFoodsFirstLetter,
  getCurrenceRecipesFoodsIngredients,
  getCurrenceRecipesFoodsName,
} from '../services/foodAPI';
import {
  getCurrenceRecipesDrinksFirstLetter,
  getCurrenceRecipesDrinksIngredients,
  getCurrenceRecipesDrinksName,
} from '../services/drinkAPI';

function Provider({ children }) {
  // const retrieveEmail = () => {
  // const storageEmail = JSON.parse(localStorage.getItem('user'));
  // return storageEmail === undefined ? '' : storageEmail.email;
  // };
  const showAlert = () => alert('Sua busca deve conter somente 1 (um) caracter');

  const [userEmail, setUserEmail] = useState('');
  const [searchRender, setSearchRender] = useState(false);
  const [filterSearch, setFilterSearch] = useState('');
  const [recipesFilters, setRecipesFilters] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [getSearchBtn, setSearchBtn] = useState(false);

  const requestApi = () => {
    if (history.location.pathname === '/bebidas') {
      if (filterSearch === 'ingredients-input') {
        getCurrenceRecipesDrinksIngredients(searchInput)
          .then((response) => setRecipesFilters(response.drinks));
      } else if (filterSearch === 'name-input') {
        getCurrenceRecipesDrinksName(searchInput)
          .then((response) => setRecipesFilters(response.drinks));
      } else if (filterSearch === 'first-letter-input') {
        if (searchInput.length > 1) {
          showAlert();
        } else {
          getCurrenceRecipesDrinksFirstLetter(searchInput)
            .then((response) => setRecipesFilters(response.drinks));
        }
      }
    } else if (filterSearch === 'ingredients-input') {
      getCurrenceRecipesFoodsIngredients(searchInput)
        .then((response) => setRecipesFilters(response.meals));
    } else if (filterSearch === 'name-input') {
      getCurrenceRecipesFoodsName(searchInput)
        .then((response) => setRecipesFilters(response.meals));
    } else if (filterSearch === 'first-letter-input') {
      if (searchInput.length > 1) {
        showAlert();
      } else {
        getCurrenceRecipesFoodsFirstLetter(searchInput)
          .then((response) => setRecipesFilters(response.meals));
      }
    }
  };

  useEffect(requestApi,
    [getSearchBtn]);

  const context = {
    filterSearch,
    userEmail,
    searchRender,
    searchInput,
    getSearchBtn,
    recipesFilters,
    setSearchBtn,
    setSearchInput,
    setFilterSearch,
    setUserEmail,
    setSearchRender,
  };

  return (
    <RecipesContext.Provider value={ context }>
      {children}
    </RecipesContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
