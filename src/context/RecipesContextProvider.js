import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import RecipesContext from './RecipesContext';

function RecipesContextProvider({ children }) {
  const [globalRecipes, setGlobalRecipes] = useState({});
  const [isFetching, setIsFetching] = useState(true);
  const [isOnlyOne, setIsOnlyOne] = useState(false);
  const [firstTwelveRecipes, setFirstTwelveRecipes] = useState([]);
  const twelve = 12;
  const zero = 0;
  // const five = 5;
  useEffect(() => {
    if (globalRecipes.drinks !== undefined) {
      setIsFetching(false);
      if (globalRecipes.drinks !== null && globalRecipes.drinks.length === 1) {
        setIsOnlyOne(true);
      } else if (globalRecipes.drinks !== null) {
        setFirstTwelveRecipes(globalRecipes.drinks.slice(zero, twelve));
      }
    }
    if (globalRecipes.meals !== undefined) {
      setIsFetching(false);
      if (globalRecipes.meals !== null && globalRecipes.meals.length === 1) {
        setIsOnlyOne(true);
      } else if (globalRecipes.meals !== null) {
        setFirstTwelveRecipes(globalRecipes.meals.slice(zero, twelve));
      }
    }
  }, [globalRecipes]);
  return (
    <RecipesContext.Provider
      value={ {
        isFetching,
        setIsFetching,
        globalRecipes,
        setGlobalRecipes,
        isOnlyOne,
        firstTwelveRecipes,
        setFirstTwelveRecipes,
      } }
    >
      {children}
    </RecipesContext.Provider>
  );
}

RecipesContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default RecipesContextProvider;
