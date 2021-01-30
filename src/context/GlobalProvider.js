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
  const {
    initialState: { email, password },
    initialFoods: { dataFoods, foodCategories },
    initialDrinks: { dataDrinks, drinkCategories },
    styledComponents: { styles },
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

        styles,
        setStyle: useCallback((elem, key, value) => {
          const newStyles = state.styledComponents;
          newStyles.styles[elem][key] = value;
          updateState('styledComponents', newStyles);
        }, [state.styledComponents]),
      } }
    >
      { children }
    </GlobalContext.Provider>
  );
}

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
