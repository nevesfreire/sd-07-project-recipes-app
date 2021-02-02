import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import * as drinkApiFunctions from '../services/drinkApiFunctions';
import * as foodApiFunctions from '../services/foodApiFunctions';

function RecipesProvider({ children }) {
  const [foodsToRender, setFoodsToRender] = useState([]);
  const [drinksToRender, setDrinksToRender] = useState([]);
  const [login, setLogin] = useState({ email: '', password: '' });
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [pathName, setPathName] = useState('');
  const [foodData, setFoodData] = useState([]);
  const [drinkData, setDrinkData] = useState([]);
  const [redirectByIngredients, setRedirectByIngredients] = useState(false);

  useEffect(() => {
    foodApiFunctions.fetchAllFoodRecipes().then((response) => setFoodData(response));
  }, []);

  useEffect(() => {
    drinkApiFunctions.fetchAllDrinkRecipes().then((response) => setDrinkData(response));
  }, []);

  useEffect(() => {
    setDrinksToRender(drinkData.drinks);
  }, [drinkData]);

  useEffect(() => {
    setFoodsToRender(foodData.meals);
  }, [foodData]);

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  const fetchByIngredients = (value) => {
    if (pathName === '/comidas') {
      foodApiFunctions
        .fetchFoodByIngredient(value)
        .then((response) => setFoodsToRender(response.meals));
    } else {
      drinkApiFunctions
        .fetchDrinkByIngredient(value)
        .then((response) => setDrinksToRender(response.drinks));
    }
  };

  const fetchInIngredientCard = (ingredient, path) => {
    if (path === '/explorar/comidas/ingredientes') {
      foodApiFunctions
        .fetchFoodByIngredient(ingredient)
        .then((response) => setFoodsToRender(response.meals));
    } else {
      drinkApiFunctions
        .fetchDrinkByIngredient(ingredient)
        .then((response) => setDrinksToRender(response.drinks));
    }
    setRedirectByIngredients(true);
  };

  const fetchByName = (value) => {
    if (pathName === '/comidas') {
      foodApiFunctions
        .fetchFoodByName(value)
        .then((response) => setFoodsToRender(response.meals));
    } else {
      drinkApiFunctions
        .fetchDrinkByName(value)
        .then((response) => setDrinksToRender(response.drinks));
    }
  };

  const fetchByFirstLetter = (value) => {
    if (pathName === '/comidas') {
      foodApiFunctions
        .fetchFoodByFirstLetter(value)
        .then((response) => setFoodsToRender(response.meals));
    } else {
      drinkApiFunctions
        .fetchDrinkByFirstLetter(value)
        .then((response) => setDrinksToRender(response.drinks));
    }
  };

  const context = {
    login,
    setLogin,
    showSearchBar,
    toggleSearchBar,
    pathName,
    setPathName,
    foodsToRender,
    setFoodsToRender,
    drinksToRender,
    setDrinksToRender,
    fetchByIngredients,
    fetchByName,
    fetchByFirstLetter,
    foodData,
    drinkData,
    fetchInIngredientCard,
    setRedirectByIngredients,
    redirectByIngredients,
  };

  return (
    <div>
      <RecipesContext.Provider value={ context }>
        {children}
      </RecipesContext.Provider>
    </div>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default RecipesProvider;
