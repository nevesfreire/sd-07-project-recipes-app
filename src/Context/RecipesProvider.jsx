import React, { useState } from 'react';
import PropTypes from 'prop-types';

import RecipesContext from './index';

function RecipesProvider({ children }) {
  const [meals, setMeals] = useState([]);

  const states = {
    email: '',
    meals,
    setMeals,
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
