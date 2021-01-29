import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getFoods, getDrinks } from '../services/API';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [mealsData, setMealsData] = useState({ meals: null });
  const [drinksData, setDrinksData] = useState({ drinks: null });


  const onFetchFoods = async() => {
    const foodRes = await getFoods();
    setMealsData(foodRes);
  }

  const onFetchDrinks = async() => {
    const drinksRes = await getDrinks();
    setDrinksData(drinksRes);
  }

  useEffect(() => {
    onFetchFoods();
    onFetchDrinks();
  }, [])

  const contextValue = {
    mealsData,
    drinksData,
    setMealsData,
    setDrinksData
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
