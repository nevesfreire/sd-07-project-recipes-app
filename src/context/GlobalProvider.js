import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import geral from '../data';
import GlobalContext from './GlobalContext';

export default function GlobalProvider({ children }) {
  const [title, setTitle] = useState('');
  const [searchButton, setSearchButton] = useState(true);
  const [searchBar, setSearchBar] = useState(false);
  // const [searchTerm, setSearchTerm] = useState('');
  const [state, setState] = useState(geral);
  const [renderButtonExplore, setRenderButtonExplore] = useState('comidas');
  const [randomRecipeDetail, setRandomRecipeDetail] = useState({});
  const [idRandom, setIdRamdom] = useState('');
  const [emailLocalStorage, setEmailLocalStorage] = useState({});
  const {
    initialState: { email, password },
    initialFoods: { dataFoods, foodCategories },
    initialDrinks: { dataDrinks, drinkCategories },
  } = state;

  const updateState = (key, value) => {
    setState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

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

  const getStorage = useCallback((key) => JSON.parse(localStorage.getItem(key)), []);
  const clearStorage = () => localStorage.clear();

  return (
    <GlobalContext.Provider
      value={ {
        getStorage,
        clearStorage,
        emailLocalStorage,
        setEmailLocalStorage,
        redirect,
        title,
        searchButton,
        setSearchButton,
        searchBar,
        setSearchBar,
        dataFoods,
        dataDrinks,
        setTitle,

        foodCategories,
        setFoodCategories: useCallback((value) => {
          const newInitialFoods = state.initialFoods;
          newInitialFoods.foodCategories = value;
          updateState('initialFoods', newInitialFoods);
        }, [state.initialFoods]),

        drinkCategories,
        setDrinkCategories: useCallback((value) => {
          const newInitialDrinks = state.initialDrinks;
          newInitialDrinks.drinkCategories = value;
          updateState('initialDrinks', newInitialDrinks);
        }, [state.initialDrinks]),

        dataFoods,
        setDataFoods: useCallback(() => {
          fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
            .then((response) => response.json())
            .then(({ meals }) => {
              const filter = () => {
                const filteredResponse = [];
                if (meals !== null) {
                  Object.entries(meals).forEach((meal, index) => {
                    const numberOfCards = 12;
                    if (index < numberOfCards) {
                      const { strMeal, strMealThumb } = meal[1];
                      filteredResponse.push({ name: strMeal, image: strMealThumb });
                    }
                  });
                }
                return filteredResponse;
              };
              const newInitialFoods = state.initialFoods;
              newInitialFoods.dataFoods = filter();
              updateState('initialFoods', newInitialFoods);
            }, []);
        }, [state.initialFoods]),

        dataDrinks,
        setDataDrinks: useCallback(() => {
          fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
            .then((response) => response.json())
            .then(({ drinks }) => {
              const filter = () => {
                const filteredResponse = [];
                if (drinks !== null) {
                  Object.entries(drinks).forEach((drink, index) => {
                    const numberOfCards = 12;
                    if (index < numberOfCards) {
                      const { strDrink, strDrinkThumb } = drink[1];
                      filteredResponse.push({ name: strDrink, image: strDrinkThumb });
                    }
                  });
                }
                return filteredResponse;
              };
              const newInitialDrinks = state.initialDrinks;
              newInitialDrinks.dataDrinks = filter();
              updateState('initialDrinks', newInitialDrinks);
            }, []);
        }, [state.initialDrinks]),

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
      {children}
    </GlobalContext.Provider>
  );
}

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
