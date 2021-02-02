import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import geral from '../data';
import GlobalContext from './GlobalContext';
import {
  foodByIngredient,
  foodByName,
  foodByLetter,
  getInitialFood,
} from '../services/foodsApi';

import {
  drinkByIngredient,
  drinkByLetter,
  drinkByName,
  getInitialDrink,
} from '../services/drinksApi';

export default function GlobalProvider({ children }) {
  const [title, setTitle] = useState('');
  const [searchButton, setSearchButton] = useState(true);
  const [searchBar, setSearchBar] = useState(false);
  const [state, setState] = useState(geral);
  const [renderButtonExplore, setRenderButtonExplore] = useState('comidas');
  const [randomRecipeDetail, setRandomRecipeDetail] = useState({});
  const [idRandom, setIdRandom] = useState('');
  const [upSearchBar, setUpSearchBar] = useState('');
  const [data, setData] = useState([]);
  const {
    initialState: { email, password },
  } = state;
  const selectedTypeFood = useCallback(async (chooseType) => {
    switch (chooseType) {
    case 'initial':
      return setData(await getInitialFood(''));
    case 'ingredients':
      return setData(await foodByIngredient(upSearchBar));
    case 'name':
      return setData(await foodByName(upSearchBar));
    case 'firstLetter':
      return setData(await foodByLetter(upSearchBar));
    default:
      return data;
    }
  }, []);

  const selectedTypeDrink = useCallback(async (chooseType) => {
    switch (chooseType) {
    case 'initial':
      return setData(await getInitialDrink(''));
    case 'ingredients':
      return setData(await drinkByIngredient(upSearchBar));
    case 'name':
      return setData(await drinkByName(upSearchBar));
    case 'firstLetter':
      return setData(await drinkByLetter(upSearchBar));
    default:
      return data;
    }
  }, []);
  function updateState(key, value) {
    setState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  }
  const history = useHistory();
  const redirect = (path) => {
    history.push({ pathname: path });
  };
  const callRandomRecipe = useCallback(async () => {
    if (renderButtonExplore === 'comidas') {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
      const dataRandom = await response.json();
      console.log(dataRandom, dataRandom.meals[0].idMeal);
      setRandomRecipeDetail(dataRandom);
      setIdRandom(dataRandom.meals[0].idMeal);
    }
    if (renderButtonExplore === 'bebidas') {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
      const dataRandom = await response.json();
      console.log(dataRandom, dataRandom.drinks[0].idDrink);
      setRandomRecipeDetail(dataRandom);
      setIdRandom(dataRandom.drinks[0].idDrink);
    }
  }, [renderButtonExplore]);

  return (
    <GlobalContext.Provider
      value={ {
        redirect,
        title,
        setTitle,
        searchButton,
        setSearchButton,
        searchBar,
        setSearchBar,
        data,
        upSearchBar,
        setUpSearchBar,
        selectedTypeFood,
        selectedTypeDrink,

        email,
        password,
        setEmail: (text) => {
          const newInitialEmail = state.initialState;
          newInitialEmail.email = text;
          updateState('email', newInitialEmail);
        },
        setPassword: (text) => {
          const newInititalPassword = state.initialState;
          newInititalPassword.password = text;
          updateState('password', newInititalPassword);
        },
        randomRecipeDetail,
        renderButtonExplore,
        setRenderButtonExplore,
        callRandomRecipe,
        setRandomRecipeDetail,
        idRandom,
      } }
    >
      { children }
    </GlobalContext.Provider>
  );
}
GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
