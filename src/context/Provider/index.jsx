import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { removeFromFavorites, addToFavLocalStorage } from '../../services/localStorage';
import RecipesContext from '../RecipesContext';

function Provider({ children }) {
  const [login, setLogin] = useState({ email: '', password: '', redirect: false });
  const [disabled, setDisabled] = useState(true);
  const [searchBarVisible, setSearchBarVisible] = useState(false);
  const [inputValues, setInputValues] = useState({ radio: 'Nome', input: '' });
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [showCopied, setShowCopied] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [doneRecipes, setDoneRecipes] = useState([]);

  const disfavor = (id) => {
    removeFromFavorites(id);
    setFavorites((prevState) => prevState.filter((element) => element.id !== id));
  };

  const addToFavorites = (obj) => {
    const newObject = {
      id: obj.idMeal || obj.idDrink,
      type: obj.idMeal ? 'comida' : 'bebida',
      area: obj.idMeal ? obj.strArea : '',
      category: obj.strCategory,
      alcoholicOrNot: obj.idDrink ? obj.strAlcoholic : '',
      name: obj.strMeal || obj.strDrink,
      image: obj.strMealThumb || obj.strDrinkThumb,
    };

    addToFavLocalStorage(newObject);
    setFavorites((prevState) => [...prevState, newObject]);
  };

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

  useEffect(() => {
    const progressRecipes = localStorage.getItem('inProgressRecipes');

    if (!progressRecipes) {
      localStorage
        .setItem('inProgressRecipes', JSON.stringify({ meals: [], cocktails: [] }));
    }
  });

  const contextValue = {
    login,
    disabled,
    meals,
    drinks,
    searchBarVisible,
    inputValues,
    favorites,
    doneRecipes,
    showCopied,
    setLogin,
    setDisabled,
    setMeals,
    setDrinks,
    setSearchBarVisible,
    setInputValues,
    setFavorites,
    setDoneRecipes,
    disfavor,
    addToFavorites,
    setShowCopied,
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
