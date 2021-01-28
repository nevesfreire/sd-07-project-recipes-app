import React, { useState } from 'react';
import PropTypes from 'prop-types';

import RecipesContext from './index';

function RecipesProvider({ children }) {
  const [data, setData] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  const states = {
    email: '',
    data,
    setData,
    categoryList,
    setCategoryList,
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
