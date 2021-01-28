import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
// import initialState from '../data/dataLogin';
import geral from '../data';
import GlobalContext from './GlobalContext';

export default function GlobalProvider({ children }) {
  const [state, setState] = useState(geral);
  const {
    initialState: { email, validatedEmail, validatedPassword },
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
        statusEmail: validatedEmail,
        statusPassword: validatedPassword,
        setEmail: (text) => updateState('email', text),
        validEmail: () => updateState('validatedEmail', true),
        validPassword: () => updateState('validatedPassword', true),
      } }
    >
      { children }
    </GlobalContext.Provider>
  );
}

GlobalProvider.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  children: PropTypes.node.isRequired,
};
