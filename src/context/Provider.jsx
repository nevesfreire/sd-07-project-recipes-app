import React, { useState } from 'react';
import PropTypes from 'prop-types';

import RecipesContext from './RecipesContext';
import TitleContext from './TitleContext';

function Provider({ children }) {
  const [foodsOrDrinksList, setFoodsOrDrinksList] = useState([]);

  return (
    <TitleContext>
      <RecipesContext.Provider
        value={ { foodsOrDrinksList, setFoodsOrDrinksList } }
      >
        {children}
      </RecipesContext.Provider>
    </TitleContext>
  );
}

Provider.propTypes = { children: PropTypes.element.isRequired };

export default Provider;
