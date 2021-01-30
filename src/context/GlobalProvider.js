import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import geral from '../data';
import GlobalContext from './GlobalContext';

export default function GlobalProvider({ children }) {
  const [title, setTitle] = useState('');
  const [searchButton, setSearchButton] = useState(true);
  const [searchBar, setSearchBar] = useState(false);
  const [state, setState] = useState(geral);
  const [renderButtonExplore, setRenderButtonExplore] = useState('comidas');
  const [randomRecipeDetail, setRandomRecipeDetail] = useState({});
  const [idRandom, setIdRamdom] = useState('');
  const {
    initialState: { email, password },
    initialFoods: { dataFoods },
    initialDrinks: { dataDrinks },
  } = state;

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
      const data = await response.json();
      console.log(data, data.meals[0].idMeal);
      setRandomRecipeDetail(data);
      setIdRamdom(data.meals[0].idMeal);
    }
    if (renderButtonExplore === 'bebidas') {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
      const data = await response.json();
      console.log(data, data.drinks[0].idDrink);
      setRandomRecipeDetail(data);
      setIdRamdom(data.drinks[0].idDrink);
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
        dataFoods,
        dataDrinks,
        setDataFoods: (value) => {
          const newInitialFoods = state.initialFoods;
          newInitialFoods.dataFoods = value;
          updateState('initialFoods', newInitialFoods);
        },
        setDataDrinks: (value) => {
          const newInitialDrinks = state.initialDrinks;
          newInitialDrinks.dataDrinks = value;
          updateState('initialDrinks', newInitialDrinks);
        },
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
