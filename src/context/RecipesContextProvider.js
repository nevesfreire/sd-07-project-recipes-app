import PropTypes from 'prop-types';
import React, { useState } from 'react';
import RecipesContext from './RecipesContext';

function RecipesContextProvider({ children }) {
  const [globalRecipes, setGlobalRecipes] = useState({});
  return (
    <RecipesContext.Provider
      value={ {
        globalRecipes,
        setGlobalRecipes,
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
