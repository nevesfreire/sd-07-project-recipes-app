import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../RecipesContext';

function Provider({ children }) {
  const [login, setLogin] = useState({ email: '', password: '', redirect: false });
  const [disabled, setDisabled] = useState(true);
  const [searchBarVisible, setSearchBarVisible] = useState(false);
  const [inputValues, setInputValues] = useState({ radio: 'Nome', input: '' });
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);

  const [favorites, setFavorites] = useState([]);
  const [doneRecipes, setDoneRecipes] = useState([]);

  useEffect(() => {
    const favoriteList = localStorage.getItem('favoriteRecipes');
    if (!favoriteList) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    } else {
      setFavorites(JSON.parse(favoriteList));
    }
  }, []);

  useEffect(() => {
    const recipes = localStorage.getItem('doneRecipes');
    if (!recipes) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    } else {
      setDoneRecipes(JSON.parse(recipes));
    }
  }, []);

  const contextValue = {
    login,
    disabled,
    meals,
    drinks,
    searchBarVisible,
    inputValues,
    favorites,
    doneRecipes,
    setLogin,
    setDisabled,
    setMeals,
    setDrinks,
    setSearchBarVisible,
    setInputValues,
    setFavorites,
    setDoneRecipes,
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
