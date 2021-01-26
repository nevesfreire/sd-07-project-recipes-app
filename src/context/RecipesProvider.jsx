import React from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './index';

function RecipesProvider({ children }) {
  const states = {
    email: '',
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
