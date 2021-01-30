import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

const RecipesProvider = ({ children }) => {
  const [recipesInput, setRecipesInput] = useState('');
  const [recipesRadio, setRecipesRatio] = useState('Ingrediente');
  const [data, setData] = useState();

  const handleRecipesInput = (event) => {
    setRecipesInput(event.target.value);
  };

  const handleRadioChange = (event) => {
    setRecipesRatio(event.target.value);
  };

  let URL = '';

  const handleClick = () => {
    switch(recipesRadio) {
    case 'Ingrediente':
      URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i={${recipesInput}}`;
      console.log(URL);
      break;
    case 'Nome':
      URL = `https://www.themealdb.com/api/json/v1/1/search.php?s={${recipesInput}}`;
      console.log(URL);
      break;
    case 'Primeira letra':
      URL = `https://www.themealdb.com/api/json/v1/1/search.php?f={${recipesInput}}`;
      console.log(URL);
      break;
    default:
      console.log('Nada');
    }
  };

  useEffect(() => { setData(fetch(URL).then((r) => r.json())); }, []);

  const context = {
    recipesInput,
    data,
    handleRadioChange,
    handleRecipesInput,
    handleClick,
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
