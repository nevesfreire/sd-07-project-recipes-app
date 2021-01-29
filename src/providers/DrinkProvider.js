import React, { useState, createContext, useEffect } from 'react';
import propTypes from 'prop-types';
import RequestDrinkAPI from '../services/drinkApi';
import RequestDrinkByName from '../services/nameDrinkApi';
import RequestDrinkByLetter from '../services/firstLetterDrinkApi';
import RequestDrinkCategories from '../services/categoriesDrink';

export const DrinkContext = createContext();

const alertMessage = () => {
  const message = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';
  alert(message);
};

const DrinkProvider = ({ children }) => {
  const [searchBar, setSearchBar] = useState(false);
  const [inputText, setInputText] = useState('');
  const [radioType, setRadioType] = useState('');
  const [data, setData] = useState([]);
  const [categoriesButtom, setCategoriesButtom] = useState([]);

  useEffect(() => {
    async function apiNewData() {
      const newData = await RequestDrinkByName('');
      setData(newData);
    }
    async function requestCategories() {
      const temp = [];
      const maxLengthButtom = 5;
      const excludeRestOfArry = 10;
      const results = await RequestDrinkCategories();
      await results.forEach((obj) => {
        const { strCategory } = obj;
        temp.push(strCategory);
      });
      temp.splice(maxLengthButtom, excludeRestOfArry);
      await setCategoriesButtom(temp);
    }
    apiNewData();
    requestCategories();
  }, []);

  const changeSearchBarState = () => {
    if (searchBar === true) setSearchBar(false);
    if (searchBar === false) setSearchBar(true);
  };

  const searchWithFilter = () => {
    async function requestByIngredient() {
      const results = await RequestDrinkAPI(inputText);
      if (!results) return alertMessage();
      setData(results);
    }

    async function requestByName() {
      const results = await RequestDrinkByName(inputText);
      if (!results) return alertMessage();
      setData(results);
    }

    async function requestByLetter() {
      const results = await RequestDrinkByLetter(inputText);
      if (!results) return alertMessage();
      setData(results);
    }

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
    categoriesButtom,
  };

  return (
    <DrinkContext.Provider value={ context }>{children}</DrinkContext.Provider>
  );
};

DrinkProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export default DrinkProvider;
