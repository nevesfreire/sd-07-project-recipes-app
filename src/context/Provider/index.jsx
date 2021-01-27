import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../RecipesContext';

function Provider({ children }) {
  const [login, setLogin] = useState({ email: '', password: '', redirect: false });
  const [disabled, setDisabled] = useState(true);
  const contextValue = {
    login,
    setLogin,
    disabled,
    setDisabled,
  };

  return (
    <RecipesContext.Provider value={ contextValue }>
      { children }
    </RecipesContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Provider;
