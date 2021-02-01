import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

const RecipesProvider = ({ children }) => {
  const [recipesInput, setRecipesInput] = useState('');
  const [recipesRadio, setRecipesRatio] = useState('');

  const handleRecipesInput = (event) => {
    setRecipesInput(event.target.value);
  };

  const handleRadioChange = (event) => {
    setRecipesRatio(event.target.value);
  };

  const context = {
    recipesInput,
    recipesRadio,
    handleRecipesInput,
    handleRadioChange,
  };

  return (
    <RecipesContext.Provider value={ context }>
      { children }
    </RecipesContext.Provider>
  );
};

export default RecipesProvider;

RecipesProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
