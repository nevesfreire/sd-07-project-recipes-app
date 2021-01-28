import React, { useState, createContext } from 'react';
import propTypes from 'prop-types';
import RequestDrinkAPI from '../services/drinkApi';
import RequestDrinkByName from '../services/nameDrinkApi';
import RequestDrinkByLetter from '../services/firstLetterDrinkApi';

export const DrinkContext = createContext();

const massage = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';

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
      await console.log(results);
      if (!results) {
        alert(massage);
      }
    }

    async function requestByName() {
      const results = await RequestDrinkByName(inputText);
      setData(results);
      if (!results) {
        alert(massage);
      }
    }

    async function requestByLetter() {
      const results = await RequestDrinkByLetter(inputText);
      setData(results);
      if (!results) {
        alert(massage);
      }
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
    <DrinkContext.Provider value={ context }>{children}</DrinkContext.Provider>
  );
};

DrinkProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export default DrinkProvider;
