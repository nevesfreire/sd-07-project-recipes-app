import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../RecipesContext';

function Provider({ children }) {
  const [login, setLogin] = useState({ email: '', password: '', redirect: false });
  const [disabled, setDisabled] = useState(true);
  const [searchBarVisible, setSearchBarVisible] = useState(false);
  const [inputValues, setInputValues] = useState({ radio: 'Nome', input: '' });
  const [meals, setMeals] = useState([]);

  const contextValue = {
    login,
    disabled,
    meals,
    searchBarVisible,
    inputValues,
    setLogin,
    setDisabled,
    setMeals,
    setSearchBarVisible,
    setInputValues,
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
