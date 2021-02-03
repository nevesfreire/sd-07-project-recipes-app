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
  const [filterSearchBar, setFilterSearchBar] = useState({});

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
      if (searchFilterCategoryFoods.length === 1) {
        searchFilterCategoryFoods[0] = { ...searchFilterCategoryFoods[0],
          redirect: true };
      }
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
      if (searchFilterCategoryDrinks.length === 1) {
        searchFilterCategoryDrinks[0] = { ...searchFilterCategoryDrinks[0],
          redirect: true };
      }
      setDrinks(searchFilterCategoryDrinks);
    }
  };

  const fecthFilterBySearchBarMeals = async () => {
    let filterFoods;
    switch (filterSearchBar.typeSearch) {
    case 'ingredient':
      filterFoods = await apiFoods(`filter.php?i=${filterSearchBar.text}`);
      break;
    case 'name':
      filterFoods = await apiFoods(`search.php?s=${filterSearchBar.text}`);
      break;
    case 'first-letter':
      filterFoods = await apiFoods(`search.php?f=${filterSearchBar.text}`);
      break;
    default: filterFoods = await apiFoods(searchAll);
    }
    setFoods(filterFoods);
  };

  const fecthFilterBySearchBarDrinks = async () => {
    let filterDrinks;
    switch (filterSearchBar.typeSearch) {
    case 'ingredient':
      filterDrinks = await apiDrinks(`filter.php?i=${filterSearchBar.text}`);
      break;
    case 'name':
      filterDrinks = await apiDrinks(`search.php?s=${filterSearchBar.text}`);
      break;
    case 'first-letter':
      filterDrinks = await apiDrinks(`search.php?f=${filterSearchBar.text}`);
      break;
    default: filterDrinks = await apiDrinks(searchAll);
    }
    setDrinks(filterDrinks);
  };

  const valueProvider = {
    foods,
    drinks,
    categoriesFoods,
    categoriesDrinks,
    filterCategoryFoods,
    filterCategoryDrinks,
    filterSearchBar,
    fetchFoods,
    fetchDrinks,
    fetchCategoriesFoods,
    fetchCategoriesDrinks,
    fetchFilterCategoryFoods,
    fetchFilterCategoryDrinks,
    setFilterCategoryDrinks,
    setFilterCategoryFoods,
    setFilterSearchBar,
    fecthFilterBySearchBarMeals,
    fecthFilterBySearchBarDrinks,
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
