import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CoffeAndCodeContext from './CoffeeAndCodeContext';

function Provider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const contextValue = {
    email,
    setEmail,
    password,
    setPassword,
  };

  return (
    <CoffeAndCodeContext.Provider value={ contextValue }>
      { children }
    </CoffeAndCodeContext.Provider>
  );
}

Provider.propTypes = { children: PropTypes.node.isRequired };

export default Provider;
