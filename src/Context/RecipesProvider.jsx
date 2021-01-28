import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import RecipesContext from './index';
import Meals from '../services/meals-api';

function RecipesProvider({ children }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleOnClickCategory = async (category) => {
    const mealsAmountToShow = 12;

    const meals = await Meals.searchMealsByCategory(category, mealsAmountToShow);
    setFilteredData(meals);
  };

  const states = {
    email: '',
    data,
    setData,
    categoryList,
    setCategoryList,
    filteredData,
    setFilteredData,
    handleOnClickCategory,
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
