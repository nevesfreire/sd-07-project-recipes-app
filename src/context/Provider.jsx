import React, { useState } from 'react';
import PropTypes from 'prop-types';

import RecipesContext from './RecipesContext';

function Provider({ children }) {
  const [a, setA] = useState('Funcionou');

  return (
    <RecipesContext.Provider
      value={ { a, setA } }
    >
      {children}
    </RecipesContext.Provider>
  );
}

Provider.propTypes = { children: PropTypes.element.isRequired };

export default Provider;
