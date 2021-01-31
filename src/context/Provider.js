import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

const RecipesProvider = ({ children }) => {
  const [recipesInput, setRecipesInput] = useState('');
  const [recipesRadio, setRecipesRatio] = useState('');
  const [data, setData] = useState();

  const handleRecipesInput = (event) => {
    setRecipesInput(event.target.value);
  };

  const handleRadioChange = (event) => {
    setRecipesRatio(event.target.value);
  };

  let URL = '';

  const handleClickFood = () => {
    console.log('Food');
    switch (recipesRadio) {
    case 'Ingrediente':
      URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${recipesInput}`;
      fetch(URL)
        .then((r) => r.json())
        .then((r) => console.log(r));
      break;
    case 'Nome':
      URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${recipesInput}`;
      fetch(URL)
        .then((r) => r.json())
        .then((r) => console.log(r));
      break;
    case 'Primeira letra':
      if (recipesInput.length === 1) {
        URL = `https://www.themealdb.com/api/json/v1/1/search.php?f=${recipesInput}`;
        fetch(URL)
          .then((r) => r.json())
          .then((r) => console.log(r));
      } else {
        alert('Sua busca deve conter somente 1 (um) caracter');
      }
      break;
    default:
      break;
    }
  };

  const handleClickDrink = () => {
    console.log('Drink');
    switch (recipesRadio) {
    case 'Ingrediente':
      URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${recipesInput}`;
      fetch(URL)
        .then((r) => r.json())
        .then((r) => console.log(r));
      break;
    case 'Nome':
      URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${recipesInput}`;
      fetch(URL)
        .then((r) => r.json())
        .then((r) => console.log(r));
      break;
    case 'Primeira letra':
      if (recipesInput.length === 1) {
        URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${recipesInput}`;
        fetch(URL)
          .then((r) => r.json())
          .then((r) => console.log(r));
      } else {
        alert('Sua busca deve conter somente 1 (um) caracter');
      }
      break;
    default:
      break;
    }
  };

  const context = {
    recipesInput,
    data,
    handleRadioChange,
    handleRecipesInput,
    handleClickFood,
    handleClickDrink,
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
