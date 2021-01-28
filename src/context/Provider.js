import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './recipesContext';
import { apiFoods, apiDrinks } from '../services/Services';

function Provider({ children }) {
  const zero = 0;
  const five = 5;
  const [foods, setFoods] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [categoriesFoods, setCategoriesFoods] = useState([]);
  const [categoriesDrinks, setCategoriesDrinks] = useState([]);
  const [filterCategoryFoods, setFilterCategoryFoods] = useState('All');
  const [filterCategoryDrinks, setFilterCategoryDrinks] = useState('All');

  const searchAll = 'search.php?s=';

  const fetchFoods = async () => {
    const searchFoods = await apiFoods(searchAll);
    setFoods(searchFoods);
  };

  const fetchDrinks = async () => {
    const searchDrinks = await apiDrinks(searchAll);
    setDrinks(searchDrinks);
  };

  const fetchCategoriesFoods = async () => {
    const searchCategoriesFoods = await apiFoods('list.php?c=list');
    const firstFiveCategories = searchCategoriesFoods.slice(zero, five);
    setCategoriesFoods(firstFiveCategories);
  };

  const fetchCategoriesDrinks = async () => {
    const searchCategoriesDrinks = await apiDrinks('list.php?c=list');
    const firstFiveCategories = searchCategoriesDrinks.slice(zero, five);
    setCategoriesDrinks(firstFiveCategories);
  };

  const fetchFilterCategoryFoods = async (category) => {
    let searchFilterCategoryFoods = [];
    if (category === 'All') {
      searchFilterCategoryFoods = await apiFoods(searchAll);
      setFoods(searchFilterCategoryFoods);
    } else {
      searchFilterCategoryFoods = await apiFoods(`filter.php?c=${category}`);
      setFoods(searchFilterCategoryFoods);
    }
  };

  const fetchFilterCategoryDrinks = async (category) => {
    let searchFilterCategoryDrinks = [];
    if (category === 'All') {
      searchFilterCategoryDrinks = await apiDrinks(searchAll);
      setDrinks(searchFilterCategoryDrinks);
    } else {
      searchFilterCategoryDrinks = await apiDrinks(`filter.php?c=${category}`);
      setDrinks(searchFilterCategoryDrinks);
    }
  };

  const valueProvider = {
    foods,
    drinks,
    categoriesFoods,
    categoriesDrinks,
    filterCategoryFoods,
    filterCategoryDrinks,
    fetchFoods,
    fetchDrinks,
    fetchCategoriesFoods,
    fetchCategoriesDrinks,
    fetchFilterCategoryFoods,
    fetchFilterCategoryDrinks,
    setFilterCategoryDrinks,
    setFilterCategoryFoods,
  };

  return (
    <RecipesContext.Provider value={ valueProvider }>
      {children}
    </RecipesContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
