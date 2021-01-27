import React from 'react';
import PropTypes from 'prop-types';

import RecipesContext from './RecipesContext';

function Provider({ children }) {
  return (
    <RecipesContext.Provider
      value={ { } }
    >
      {children}
    </RecipesContext.Provider>
  );
}

Provider.propTypes = { children: PropTypes.element.isRequired };

export default Provider;
