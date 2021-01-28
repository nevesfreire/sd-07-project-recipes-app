import React, { useState } from 'react';
import PropTypes from 'prop-types';
import initialState from '../data/dataLogin';
import GlobalContext from './GlobalContext';

export default function Provider(props) {
  const [state, setState] = useState(initialState);
  const { children } = props;
  function updateState(key, value) {
    setState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  }

  return (
    <GlobalContext.Provider
      value={ {
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

Provider.propTypes = {
  children: PropTypes.shape().isRequired,
};
