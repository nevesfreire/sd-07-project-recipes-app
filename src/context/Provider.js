import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './recipesContext';
import { apiFoods, apiDrinks } from '../services/Services';

function Provider({ children }) {
  const [foods, setFoods] = useState([]);
  const [drinks, setdrinks] = useState([]);

  const fetchFoods = async () => {
    const searchFoods = await apiFoods('search.php?s=');
    setFoods(searchFoods);
  };

  const fetchdrinks = async () => {
    const searchdrinks = await apiDrinks('search.php?s=');
    setdrinks(searchdrinks);
  };

  const valueProvider = {
    foods,
    drinks,
    fetchFoods,
    fetchdrinks,
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
