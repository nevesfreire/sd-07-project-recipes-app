import React, { useState } from 'react';
import propTypes from 'prop-types';
import RecipesContext from './Context/Context';
import RequestFoodAPI from '../services/foodApi';

import RequestFoodBayName from '../services/nameFoodApi';
import RequestFoodByLetter from '../services/firstLetterFoodApi';

const FoodProvider = ({ children }) => {
  const [tittleHeader, setTittleHeader] = useState('Comidas');
  const [searchBar, setSearchBar] = useState(false);
  const [inputText, setInputText] = useState('');
  const [radioType, setRadioType] = useState('');
  const [foodData, setFoodData] = useState();

  const changeSearchBarState = () => {
    if (searchBar === true) setSearchBar(false);
    if (searchBar === false) setSearchBar(true);
  };

  const searchWithFilter = () => {
    if (radioType === 'Ingrediente') {
      async function getApi() {
        const results = await RequestFoodAPI(inputText);
        await setFoodData(results);
        await console.log(results);
      }
      getApi();
    }
    if (radioType === 'Nome') {
      async function getApi() {
        const results = await RequestFoodBayName(inputText);
        await setFoodData(results);
        await console.log(results);
      }
      getApi();
    }
    if (radioType === 'firtLetter') {
      async function getApi() {
        const results = await RequestFoodByLetter(inputText);
        await setFoodData(results);
        await console.log(results);
      }
      inputText.length > 1 ? alert('Sua busca deve conter somente 1 (um) caracter') : getApi();
    }
  };

  const context = {
    tittleHeader,
    setTittleHeader,
    searchBar,
    changeSearchBarState,
    radioType,
    setRadioType,
    searchWithFilter,
    inputText,
    setInputText,
    foodData,
  };

  return (
    <RecipesContext.Provider value={ context }>
      {children}
    </RecipesContext.Provider>
  );
};

FoodProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export default FoodProvider;
