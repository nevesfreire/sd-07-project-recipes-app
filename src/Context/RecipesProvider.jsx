import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import RecipesContext from './index';
import Meals from '../services/meals-api';

function RecipesProvider({ children }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [currentFilterCategory, setCurrentFilterCategory] = useState('All');

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleClickCategory = async (category) => {
    const mealsAmountToShow = 12;

    if (category === 'All') {
      setFilteredData(data);
      return setCurrentFilterCategory('All');
    }

    if (currentFilterCategory !== category) {
      const meals = await Meals.searchMealsByCategory(category, mealsAmountToShow);
      setFilteredData(meals);
      return setCurrentFilterCategory(category);
    }
    setFilteredData(data);
    setCurrentFilterCategory('All');
  };

  const states = {
    email: '',
    data,
    setData,
    categoryList,
    setCategoryList,
    filteredData,
    setFilteredData,
    handleClickCategory,
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
