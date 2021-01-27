import React, { useState } from 'react';
import { initialState } from '../data/dataLogin';
import GlobalContext from './GlobalContext';

export default function Provider(props) {
  const [state, setState] = useState(initialState)

  function updateState(key, value) {
    setState({
      ...state,
      [key]: value,
    });
  }

  return (
    <GlobalContext.Provider value={{
        email: state.email,
        statusEmail: state.validatedEmail,
        statusPassword: state.validatedEmail,
        setEmail: text => updateState('email', text),
        setPassword: text => updateState('password', text),
        validEmail: () => updateState('validatedEmail', true),
        validPassword: () => updateState('validatedPassword', true),
    }}>
      {props.children}
    </GlobalContext.Provider>
  );
}
