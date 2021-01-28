import React, { useState, createContext } from 'react';
import propTypes from 'prop-types';
import RequestDrinkAPI from '../services/drinkApi';
import RequestDrinkByName from '../services/nameDrinkApi';
import RequestDrinkByLetter from '../services/firstLetterDrinkApi';

export const DrinkContext = createContext();

const DrinkProvider = ({ children }) => {
  const [searchBar, setSearchBar] = useState(false);
  const [inputText, setInputText] = useState('');
  const [radioType, setRadioType] = useState('');
  const [data, setData] = useState([]);

  const changeSearchBarState = () => {
    if (searchBar === true) setSearchBar(false);
    if (searchBar === false) setSearchBar(true);
  };

  const searchWithFilter = () => {
    async function requestByIngredient() {
      const results = await RequestDrinkAPI(inputText);
      setData(results);
      console.log(results);
    }

    async function requestByName() {
      const results = await RequestDrinkByName(inputText);
      setData(results);
      console.log(results);
    }

    async function requestByLetter() {
      const results = await RequestDrinkByLetter(inputText);
      setData(results);
      console.log(results);
    }

    // const teste = () => { customAlert('Sua busca deve conter somente 1 (um) caracter'); };

    if (radioType === 'Ingrediente') {
      requestByIngredient();
    }
    if (radioType === 'Nome') {
      requestByName();
    }
    if (radioType === 'firtLetter') {
      if (inputText.length > 1) {
        alert('Sua busca deve conter somente 1 (um) caracter');
      } else {
        requestByLetter();
      }
    }
  };

  const context = {
    searchBar,
    changeSearchBarState,
    radioType,
    setRadioType,
    searchWithFilter,
    inputText,
    setInputText,
    data,
  };

  return (
    <DrinkContext.Provider value={ context }>
      {children}
    </DrinkContext.Provider>
  );
};

DrinkProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export default DrinkProvider;
