import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import RecipesContext from './index';
import Meals from '../services/meals-api';
import Drinks from '../services/cocktails-api';

const getLocalStorageItem = (item) => {
  const itemString = localStorage.getItem(item);
  const itemObj = JSON.parse(itemString);

  return itemObj;
};

function RecipesProvider({ children }) {
  const [mealsData, setMealsData] = useState([]);
  const [mealsFilteredData, setMealsFilteredData] = useState([]);
  const [mealsCategoryList, setMealsCategoryList] = useState([]);
  const [currentFilterMealsCategory, setCurrentFilterMealsCategory] = useState('All');

  const [drinksData, setDrinksData] = useState([]);
  const [drinksFilteredData, setDrinksFilteredData] = useState([]);
  const [drinksCategoryList, setDrinksCategoryList] = useState([]);
  const [currentFilterDrinksCategory, setCurrentFilterDrinksCategory] = useState('All');

  const [inProgressRecipes, setInProgressRecipes] = useState({});
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [updatingLocalStorage, setUpdatingLocalStorage] = useState(true);

  const [searchData, setSearchData] = useState('');
  const [isSearchBarActive, setIsSearchBarActive] = useState(false);

  useEffect(() => {
    const inProgressItems = getLocalStorageItem('inProgressRecipes');
    if (inProgressItems) setInProgressRecipes(inProgressItems);

    const favoriteItems = getLocalStorageItem('favoriteRecipes');
    if (favoriteItems) setFavoriteRecipes(favoriteItems);

    const doneItems = getLocalStorageItem('doneRecipes');
    if (doneItems) setDoneRecipes(doneItems);

    setUpdatingLocalStorage(false);
  }, []);

  useEffect(() => {
    if (!updatingLocalStorage) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
      localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    }
  }, [inProgressRecipes, favoriteRecipes, doneRecipes, updatingLocalStorage]);

  useEffect(() => {
    setMealsFilteredData(mealsData);
  }, [mealsData]);

  useEffect(() => {
    setDrinksFilteredData(drinksData);
  }, [drinksData]);

  const checkFavorite = (id) => {
    const foundRecipe = favoriteRecipes.find((recipe) => recipe.id === id);

    if (foundRecipe) return true;
    return false;
  };

  const handleClickCategoryMeals = async (category) => {
    const mealsAmountToShow = 12;

    if (category === 'All') {
      setMealsFilteredData(mealsData);
      return setCurrentFilterMealsCategory('All');
    }

    if (currentFilterMealsCategory !== category) {
      const meals = await Meals.searchMealsByCategory(category, mealsAmountToShow);
      setMealsFilteredData(meals);
      return setCurrentFilterMealsCategory(category);
    }

    setMealsFilteredData(mealsData);
    setCurrentFilterMealsCategory('All');
  };

  const handleClickCategoryDrinks = async (category) => {
    const mealsAmountToShow = 12;

    if (category === 'All') {
      setDrinksFilteredData(drinksData);
      return setCurrentFilterDrinksCategory('All');
    }

    if (currentFilterDrinksCategory !== category) {
      const drinks = await Drinks.searchCocktailsByCategory(category, mealsAmountToShow);
      setDrinksFilteredData(drinks);
      return setCurrentFilterDrinksCategory(category);
    }

    setDrinksFilteredData(drinksData);
    setCurrentFilterDrinksCategory('All');
  };

  const verifyInProgress = (id, page) => {
    const key = page === 'meal' ? 'meals' : 'cocktails';

    if (inProgressRecipes[key]) {
      const isInProgress = inProgressRecipes[key][id];
      if (isInProgress) return true;
    }
    return false;
  };

  const handleClickFavorite = (recipe, type) => {
    if (type === 'meal') {
      const { idMeal, strArea, strCategory, strMeal, strMealThumb } = recipe;

      const alreadyFavorite = checkFavorite(idMeal);

      if (alreadyFavorite) {
        const filteredFavoriteRecipes = favoriteRecipes.filter(({ id }) => id !== idMeal);
        return setFavoriteRecipes(filteredFavoriteRecipes);
      }

      const newFavorite = {
        id: idMeal,
        type: type === 'meal' ? 'comida' : 'bebida',
        area: strArea,
        category: strCategory,
        alcoholicOrNot: '',
        name: strMeal,
        image: strMealThumb,
      };

      return setFavoriteRecipes((state) => [...state, newFavorite]);
    }

    const { idDrink, strCategory, strAlcoholic, strDrink, strDrinkThumb } = recipe;

    const alreadyFavorite = checkFavorite(idDrink);

    if (alreadyFavorite) {
      const filteredFavoriteRecipes = favoriteRecipes.filter(({ id }) => id !== idDrink);
      return setFavoriteRecipes(filteredFavoriteRecipes);
    }

    const newFavorite = {
      id: idDrink,
      type: type === 'meal' ? 'comida' : 'bebida',
      area: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
    };

    setFavoriteRecipes((state) => [...state, newFavorite]);
  };

  const handleClickStartRecipe = (id, ingredients, page) => {
    const key = page === 'meal' ? 'meals' : 'cocktails';

    const isInProgress = verifyInProgress(id, page);

    if (!isInProgress) {
      setInProgressRecipes((state) => ({
        ...state,
        [key]: { ...state[key], [id]: ingredients },
      }));
    }
  };

  const states = {
    doneRecipes,
    checkFavorite,
    handleClickFavorite,
    verifyInProgress,
    handleClickStartRecipe,
    email: '',
    meal: {
      mealsData,
      setMealsData,
      mealsCategoryList,
      setMealsCategoryList,
      mealsFilteredData,
      setMealsFilteredData,
      handleClickCategoryMeals,
    },
    drink: {
      drinksData,
      setDrinksData,
      drinksCategoryList,
      setDrinksCategoryList,
      drinksFilteredData,
      setDrinksFilteredData,
      handleClickCategoryDrinks,
    },
    isSearchBarActive,
    setIsSearchBarActive,
    searchData,
    setSearchData,
  };

  return (
    <RecipesContext.Provider value={ states }>
      {children}
    </RecipesContext.Provider>
  );
}

export default RecipesProvider;

RecipesProvider.propTypes = { children: PropTypes.element.isRequired };
