import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FoodAppContext from './FoodAppContext';
import { mealsAPI, drinksAPI } from '../services';

function Provider({ children }) {
  const [mealsData, setMealsData] = useState({});
  const [drinksData, setDrinksData] = useState({});
  const getMealsDrinks = async () => {
    const { meals } = await mealsAPI();
    const { drinks } = await drinksAPI();
    setMealsData(meals);
    setDrinksData(drinks);
  };
  useEffect(() => { getMealsDrinks(); }, []);
  const context = { mealsData, drinksData };
  return (
    <FoodAppContext.Provider value={ context }>
      { children }
    </FoodAppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.shape().isRequired,
};

export default Provider;
