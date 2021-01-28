import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function Provider({ children }) {
  const [mealRecipeId, setMealRecipeId] = useState('52771');
  const [drinkRecipeId, setDrinkRecipeId] = useState('178319');
  const [recipeDetailFood, setRecipeDetailFood] = useState({});
  const [recipeDetailDrink, setRecipeDetailDrink] = useState({});

  const context = {
    mealRecipeId,
    drinkRecipeId,
    recipeDetailFood,
    recipeDetailDrink,
    setMealRecipeId,
    setDrinkRecipeId,
    setRecipeDetailFood,
    setRecipeDetailDrink,
  };

  return (
    <RecipesContext.Provider value={ context }>
      {children}
    </RecipesContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
