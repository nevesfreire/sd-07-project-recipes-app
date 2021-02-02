import React, { createContext, useState } from 'react';
import propTypes from 'prop-types';

const RecipeDetailsContext = createContext();

const RecipeProviderDetails = ({ children }) => {

  const context = {
    
  };

  return (
    <RecipeDetailsContext.Provider value={ context }>
      { children }
    </RecipeDetailsContext.Provider>
  );
};

export { RecipeDetailsContext, RecipeProviderDetails as ProviderDetails };

RecipeProviderDetails.propTypes = {
  children: propTypes.objectOf(),
}.isRequired;
