import React from 'react';
import PropTypes from 'prop-types';
import RecipeContext from './Context';

function RecipeProvider({ children }) {
  const context = {};
  return (
    <RecipeContext.Provider value={ context }>
      {children}
    </RecipeContext.Provider>);
}

RecipeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipeProvider;
