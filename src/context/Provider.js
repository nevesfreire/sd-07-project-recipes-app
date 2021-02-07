import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import FoodAppContext from './FoodAppContext';
import { mealsAPI, drinksAPI, detailApi } from '../services';

function Provider({ children }) {
  const [mealsData, setMealsData] = useState([]);
  const [drinksData, setDrinksData] = useState([]);
  const [detailRecipe, setDetailRecipe] = useState({});
  const [showSearch, setShowSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getMealsDrinks = async () => {
    setIsLoading(true);
    const { meals } = await mealsAPI('', '');
    const { drinks } = await drinksAPI('', '');
    setMealsData(meals);
    setDrinksData(drinks);
    setIsLoading(false);
  };

  const handleClickDetail = async (pathname, id) => {
    setIsLoading(true);
    const detail = await detailApi(id, pathname);
    setDetailRecipe(detail);
    setIsLoading(false);
  };

  if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
    localStorage.setItem('inProgressRecipes',
      JSON.stringify({ meals: {}, cocktails: {} }));
  }
  if (!JSON.parse(localStorage.getItem('doneRecipes'))) {
    localStorage.setItem('doneRecipes',
      JSON.stringify([]));
  }

  useEffect(() => {
    getMealsDrinks();
  }, []);

  const context = {
    isLoading,
    drinksData,
    mealsData,
    setMealsData,
    setDrinksData,
    mealsAPI,
    drinksAPI,
    detailApi,
    showSearch,
    setShowSearch,
    handleClickDetail,
    detailRecipe,
  };

  return (
    <FoodAppContext.Provider value={ context }>
      { children}
    </FoodAppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.shape({}),
};

Provider.defaultProps = {
  children: {},
};

export default Provider;
