import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import RecipesContext from './index';
import Meals from '../services/meals-api';
import Drinks from '../services/cocktails-api';

function RecipesProvider({ children }) {
  const [mealsData, setMealsData] = useState([]);
  const [mealsFilteredData, setMealsFilteredData] = useState([]);
  const [mealsCategoryList, setMealsCategoryList] = useState([]);
  const [currentFilterMealsCategory, setCurrentFilterMealsCategory] = useState('All');

  const [drinksData, setDrinksData] = useState([]);
  const [drinksFilteredData, setDrinksFilteredData] = useState([]);
  const [drinksCategoryList, setDrinksCategoryList] = useState([]);
  const [currentFilterDrinksCategory, setCurrentFilterDrinksCategory] = useState('All');

  useEffect(() => {
    setMealsFilteredData(mealsData);
  }, [mealsData]);

  useEffect(() => {
    setDrinksFilteredData(drinksData);
  }, [drinksData]);

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

  const states = {
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
  };

  return (
    <RecipesContext.Provider value={ states }>
      {children}
    </RecipesContext.Provider>
  );
}

export default RecipesProvider;

RecipesProvider.propTypes = {
  children: PropTypes.element,
};

RecipesProvider.defaultProps = {
  children: PropTypes.element,
};
