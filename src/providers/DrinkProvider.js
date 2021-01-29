import React, { useState, createContext, useEffect } from 'react';
import propTypes from 'prop-types';
import RequestDrinkAPI from '../services/drinkApi';
import RequestDrinkByName from '../services/nameDrinkApi';
import RequestDrinkByLetter from '../services/firstLetterDrinkApi';
import RequestDrinkCategories from '../services/categoriesDrink';

export const DrinkContext = createContext();

const DrinkProvider = ({ children }) => {
  const categories = [
    'Ordinary Drink', 'Cocktail', 'Milk / Float / Shake', 'Other/Unknown', 'Cocoa',
  ];
  const [searchBar, setSearchBar] = useState(false);
  const [inputText, setInputText] = useState('');
  const [radioType, setRadioType] = useState('');
  const [data, setData] = useState([]);
  const [repeatedButton, setRepeatedButton] = useState(
    { 'Ordinary Drink': false,
      Cocktail: false,
      'Milk / Float / Shake': false,
      'Other/Unknown': false,
      Cocoa: false,
    },
  );

  useEffect(() => {
    async function apiNewData() {
      const newData = await RequestDrinkByName('');
      setData(newData);
    }
    apiNewData();
  }, []);

  const allButton = async () => setData(await RequestDrinkByName(''));

  const categoriesData = async ({ target: { id } }) => {
    if (repeatedButton[id]) {
      setRepeatedButton({ ...repeatedButton, [id]: !repeatedButton[id] });
      return setData(await RequestDrinkByName(''));
    }
    setRepeatedButton({ ...repeatedButton, [id]: !repeatedButton[id] });
    return setData(await RequestDrinkCategories(id));
  };

  const alertMessage = () => {
    const message = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';
    alert(message);
  };

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
    categories,
    categoriesData,
    allButton,
  };

  return (
    <DrinkContext.Provider value={ context }>{children}</DrinkContext.Provider>
  );
};

DrinkProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export default DrinkProvider;
