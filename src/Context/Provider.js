import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import getMeal from '../services/mealAPI';

function Provider({ children }) {
  const [pageTitle, setPageTitle] = useState('');
  const [control, setControl] = useState(false);
  const [recipes, setRecipes] = useState({});

  const fetchMeal = async (type, value) => {
    const result = await getMeal(type, value);
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

  const contextValue = {
    pageTitle,
    setPageTitle,
    control,
    setControl,
    recipes,
    fetchMeal,
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
