import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from './Context';

function RecipeProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [categoriesFood, setCategoriesFood] = useState([]);
  const [categoriesDrinks, setCategoriesDrinks] = useState([]);
  const [detailsRecipe, setDetailsRecipe] = useState([]);
  const [typeAndIdDetails, setTypeAndIdDetails] = useState({});

  const context = {
    recipes,
    setRecipes,
    categoriesFood,
    setCategoriesFood,
    categoriesDrinks,
    setCategoriesDrinks,
    detailsRecipe,
    setDetailsRecipe,
    typeAndIdDetails,
    setTypeAndIdDetails,
  };

  return (
    <RecipeContext.Provider value={ context }>
      {children}
    </RecipeContext.Provider>);
}

RecipeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipeProvider;
