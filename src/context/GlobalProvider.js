import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import geral from '../data';
import GlobalContext from './GlobalContext';

export default function GlobalProvider({ children }) {
  const [state, setState] = useState(geral);
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

  return (
    <GlobalContext.Provider
      value={ {
        redirect,
        foodCategories,
        setFoodCategories: (value) => {
          const newInitialFoods = state.initialFoods;
          newInitialFoods.foodCategories = value;
          updateState('initialFoods', newInitialFoods);
        },
        drinkCategories,
        setDrinkCategories: (value) => {
          const newInitialDrinks = state.initialDrinks;
          newInitialDrinks.drinkCategories = value;
          updateState('initialDrinks', newInitialDrinks);
        },
        dataFoods,
        setDataFoods: (value) => {
          const newInitialFoods = state.initialFoods;
          newInitialFoods.dataFoods = value;
          updateState('initialFoods', newInitialFoods);
        },
        dataDrinks,
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
      } }
    >
      { children }
    </GlobalContext.Provider>
  );
}

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
