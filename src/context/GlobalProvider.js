import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import initialState from '../data/dataLogin';
import GlobalContext from './GlobalContext';

export default function GlobalProvider({ children }) {
  const [state, setState] = useState(initialState);

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
        email: state.email,
        statusEmail: state.validatedEmail,
        statusPassword: state.validatedPassword,
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
  }).isRequired,
  children: PropTypes.node.isRequired,
};
