import React from 'react';
import PropTypes from 'prop-types';

import RecipesContext from './RecipesContext';
import TitleContext from './TitleContext';

function Provider({ children }) {
  return (
    <TitleContext>
      <RecipesContext.Provider
        value={ { } }
      >
        {children}
      </RecipesContext.Provider>
    </TitleContext>
  );
}

Provider.propTypes = { children: PropTypes.element.isRequired };

export default Provider;
