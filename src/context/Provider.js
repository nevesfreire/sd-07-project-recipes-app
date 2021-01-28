import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FoodAppContext from './FoodAppContext';
import { mealsAPI, drinksAPI, categoryMealApi, categoryDrinkApi } from '../services';

function Provider({ children }) {
  const [mealsData, setMealsData] = useState([]);
  const [drinksData, setDrinksData] = useState([]);
  const [mealsCategory, setMealsCategory] = useState([]);
  const [drinksCategory, setDrinksCategory] = useState([]);
  const getMealsDrinks = async () => {
    const { meals } = await mealsAPI();
    const { drinks } = await drinksAPI();
    const { meals: categoryMeal } = await categoryMealApi();
    const { drinks: categoryDrink } = await categoryDrinkApi();
    setMealsData(meals);
    setDrinksData(drinks);
    setMealsCategory(categoryMeal);
    setDrinksCategory(categoryDrink);
  };

  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    getMealsDrinks();
  }, []);

  const context = {
    mealsData,
    setMealsData,
    setDrinksData,
    drinksData,
    mealsCategory,
    drinksCategory,
    showSearch,
    setShowSearch,
  };

  return (
    <FoodAppContext.Provider value={ context }>
      { children }
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
