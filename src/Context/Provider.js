import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import getMeals from '../services/mealAPI';
import getDrinks from '../services/cockTailAPI';

function Provider({ children }) {
  const [control, setControl] = useState(false);
  const [recipes, setRecipes] = useState({});

  const fetchMeals = async (type, value) => {
    const result = await getMeals(type, value);
    setRecipes(result);
    const resultReturn = {
      result,
      redirect: false,
    };
    if (result.meals === null) {
      return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    if (result.meals.length === 1) {
      resultReturn.redirect = true;
      setControl(true);
      return resultReturn;
    }
    setControl(true);
    return resultReturn;
  };

  const fetchDrinks = async (type, value) => {
    const result = await getDrinks(type, value);
    setRecipes(result);
    const resultReturn = {
      result,
      redirect: false,
    };
    if (result.drinks === null) {
      return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    if (result.drinks.length === 1) {
      resultReturn.redirect = true;
      setControl(true);
      return resultReturn;
    }
    setControl(true);
    return resultReturn;
  };

  const contextValue = {
    control,
    setControl,
    recipes,
    fetchMeals,
    fetchDrinks,
  };

  return (
    <RecipesContext.Provider value={ contextValue }>
      {children}
    </RecipesContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
