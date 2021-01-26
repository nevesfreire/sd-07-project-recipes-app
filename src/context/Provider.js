import React from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './recipesContext';

function Provider({ children }) {
  return (
    <RecipesContext.Provider>
      {children}
    </RecipesContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
