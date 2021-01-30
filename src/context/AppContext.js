import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getMeals,
  getDrinks,
  getMealsCategories,
  getDrinksCategories,
  getMealsByCategories,
  getDrinksByCategories } from '../services/API';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const fullLength = 12;
  const categoryRange = 5;
  const [mealsData, setMealsData] = useState({ meals: null });
  const [drinksData, setDrinksData] = useState({ drinks: null });
  const [mealsCategories, setMealsCategories] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState({ meals: null });
  const [filteredDrinks, setFilteredDrinks] = useState({ drinks: null });
  const [chosenMealCategory, setChosenMealCategory] = useState('');
  const [chosenDrinkCategory, setChosenDrinkCategory] = useState('');

  const onFetchMeals = async () => {
    const foodRes = await getMeals();
    setMealsData(foodRes);
  };

  const onFetchMealsCategories = async () => {
    const foodCategoriesRes = await getMealsCategories();
    const { meals } = foodCategoriesRes;
    setMealsCategories(meals
      .filter((item, index) => item.strCategory && index < categoryRange));
  };

  const onFetchDrinks = async () => {
    const drinksRes = await getDrinks();
    setDrinksData(drinksRes);
  };

  const onFetchDrinksCategories = async () => {
    const drinksCategoriesRes = await getDrinksCategories();
    const { drinks } = drinksCategoriesRes;
    setDrinksCategories(drinks
      .filter((item, index) => item.strCategory && index < categoryRange));
  };

  const onFetchGetMealsByCategory = async (category) => {
    let filtered = {};
    const mealsRes = await getMealsByCategories(category);
    if (category === chosenMealCategory) {
      setFilteredMeals(mealsData);
      setChosenMealCategory('');
    } else {
      filtered = { meals: mealsRes.meals.filter((item, index) => index < fullLength) };
      setFilteredMeals(filtered);
      setChosenMealCategory(category);
    }
  };

  const onFetchGetDrinksByCategory = async (category) => {
    let filtered = {};
    const drinksRes = await getDrinksByCategories(category);
    if (category === chosenDrinkCategory) {
      setFilteredDrinks(drinksData);
      setChosenDrinkCategory('');
    } else {
      filtered = { drinks: drinksRes.drinks.filter((item, index) => index < fullLength) };
      setFilteredDrinks(filtered);
      setChosenDrinkCategory(category);
    }
  };

  const filterByCategory = async (event, categoryType) => {
    const { name } = event.target;
    switch (categoryType) {
    case 'meals':
      onFetchGetMealsByCategory(name);
      break;
    case 'drinks':
      onFetchGetDrinksByCategory(name);
      break;
    case 'all-meals':
      setFilteredMeals(mealsData);
      setChosenMealCategory(categoryType);
      break;
    case 'all-drinks':
      setFilteredDrinks(drinksData);
      setChosenDrinkCategory(categoryType);
      break;
    default:
    }
  };

  useEffect(() => {
    onFetchMeals();
    onFetchMealsCategories();
    onFetchDrinks();
    onFetchDrinksCategories();
  }, []);

  const contextValue = {
    mealsData,
    drinksData,
    setMealsData,
    setDrinksData,
    mealsCategories,
    drinksCategories,
    filterByCategory,
    filteredMeals: !filteredMeals.meals ? mealsData : filteredMeals,
    setFilteredMeals,
    filteredDrinks: !filteredDrinks.drinks ? drinksData : filteredDrinks,
    setFilteredDrinks,
  };

  return (
    <AppContext.Provider value={ contextValue }>
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
};

export { AppContext, AppProvider };
