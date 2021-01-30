import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getMeals, getDrinks, getMealsCategories, getDrinksCategories } from '../services/API';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const categoryRange = 5
  const [mealsData, setMealsData] = useState({ meals: null });
  const [drinksData, setDrinksData] = useState({ drinks: null });
  const [mealsCategories, setMealsCategories] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);


  const onFetchMeals = async() => {
    const foodRes = await getMeals();
    setMealsData(foodRes);
  }

  const onFetchMealsCategories = async() => {
    const foodCategoriesRes = await getMealsCategories();
    const { meals } = foodCategoriesRes;
    setMealsCategories(meals.filter((item, index) => item.strCategory && index < categoryRange));
  }

  const onFetchDrinks = async() => {
    const drinksRes = await getDrinks();
    setDrinksData(drinksRes);
  }

  const onFetchDrinksCategories = async() => {
    const drinksCategoriesRes = await getDrinksCategories();
    const { drinks } = drinksCategoriesRes;
    setDrinksCategories(drinks.filter((item, index) => item.strCategory && index < categoryRange))
  }

  const filterByCategory = () => {
    console.log('clicou mano')
  }



  useEffect(() => {
    onFetchMeals();
    onFetchMealsCategories();
    onFetchDrinks();
    onFetchDrinksCategories();
  }, [])

  const contextValue = {
    mealsData,
    drinksData,
    setMealsData,
    setDrinksData,
    mealsCategories,
    drinksCategories,
    filterByCategory
  }

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
