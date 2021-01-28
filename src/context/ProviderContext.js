import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from './RecipeContext';

function ProviderContext({ children }) {
  const [showBtn, setShowBtn] = useState(false);
  const searchClick = () => (
    showBtn === true ? setShowBtn(false) : setShowBtn(true)
  );
  const contextValue = {
    showBtn,
    searchClick,
  };

  return (
    <RecipeContext.Provider value={ contextValue }>
      {children}
    </RecipeContext.Provider>
  );
}

ProviderContext.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProviderContext;
