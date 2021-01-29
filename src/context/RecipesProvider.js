import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import RecipesContext from './RecipesContext';
import {
  fetchSearchMealIngredient,
  fetchSearchMealName,
  fetchSearchMealLetter,
  fetchSearchDrinkIngredient,
  fetchSearchDrinkName,
  fetchSearchDrinkLetter,
  fetchMealSurprise,
  fetchDrinkSurprise,
  fetchMealsIngredients,
  fetchDrinksIngredients,
} from '../services/api';

function Provider({ children }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [url, setUrl] = useState('');
  const [searching, setSearching] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [cards, setCards] = useState([]);
  const [optionSearch, setOptionSearch] = useState('');
  const [inputSearch, setInputSearch] = useState('');
  const [loadResults, setLoadResults] = useState(false);

  const history = useHistory();

  const handleEntrarButton = () => {
    localStorage.clear();
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
    localStorage.setItem('user', JSON.stringify({ email }));
  };

  const handleUrlChange = () => {
    setUrl(window.location.href);
  };

  const urlComidas = 'http://localhost:3000/comidas';
  const urlBebidas = 'http://localhost:3000/bebidas';
  const titleByUrl = () => {
    switch (url) {
    case urlComidas:
      return 'Comidas';
    case urlBebidas:
      return 'Bebidas';
    case 'http://localhost:3000/explorar':
      return 'Explorar';
    case 'http://localhost:3000/explorar/comidas':
      return 'Explorar Comidas';
    case 'http://localhost:3000/explorar/bebidas':
      return 'Explorar Bebidas';
    case 'http://localhost:3000/explorar/comidas/ingredientes':
      return 'Explorar Ingredientes';
    case 'http://localhost:3000/explorar/bebidas/ingredientes':
      return 'Explorar Ingredientes';
    case 'http://localhost:3000/explorar/comidas/area':
      return 'Explorar Origem';
    case 'http://localhost:3000/perfil':
      return 'Perfil';
    case 'http://localhost:3000/receitas-feitas':
      return 'Receitas Feitas';
    case 'http://localhost:3000/receitas-favoritas':
      return 'Receitas Favoritas';
    default:
      return '';
    }
  };

  const handleSearchButton = (e) => {
    if (e) {
      switch (searching) {
      case true:
        return setSearching(false);
      default:
        return setSearching(true);
      }
    }
  };

  const handleBuscarButton = async () => {
    const mealIngredient = (url === urlComidas && optionSearch === 'ingredient');
    const mealName = (url === urlComidas && optionSearch === 'name');
    const mealLetter = (url === urlComidas && optionSearch === 'letter');
    const drinkIngredient = (url === urlBebidas && optionSearch === 'ingredient');
    const drinkName = (url === urlBebidas && optionSearch === 'name');
    const drinkLetter = (url === urlBebidas && optionSearch === 'letter');

    if (mealIngredient) { setCards(await fetchSearchMealIngredient(inputSearch)); }
    if (mealName) { setCards(await fetchSearchMealName(inputSearch)); }
    if (mealLetter) { setCards(await fetchSearchMealLetter(inputSearch[0])); }
    if (drinkIngredient) { setCards(await fetchSearchDrinkIngredient(inputSearch)); }
    if (drinkName) { setCards(await fetchSearchDrinkName(inputSearch)); }
    if (drinkLetter) { setCards(await fetchSearchDrinkLetter(inputSearch[0])); }

    setIsFetching(false);
    setLoadResults(true);
  };

  const getMealSurprise = async () => {
    setCards(await fetchMealSurprise());
    setIsFetching(false);
  };

  const handleMealSurpriseButton = () => {
    getMealSurprise();
    history.push(`/comidas/${cards[0].idMeal}`);
  };

  const getDrinkSurprise = async () => {
    setCards(await fetchDrinkSurprise());
    setIsFetching(false);
  };

  const handleDrinkSurpriseButton = () => {
    getDrinkSurprise();
    history.push(`/bebidas/${cards[0].idDrink}`);
  };

  useEffect(() => {
    getMealSurprise();
    getDrinkSurprise();
  }, []);

  const getMealsIngredients = async () => {
    setCards(await fetchMealsIngredients());
    setIsFetching(false);
  };

  const handleMealIngredientButton = () => {
    getMealsIngredients();
  };

  const getDrinksIngredients = async () => {
    setCards(await fetchDrinksIngredients());
    setIsFetching(false);
  };

  const handleDrinksIngredientsButton = () => {
    getDrinksIngredients();
  };

  useEffect(async() => {
    await getMealsIngredients();
    // await getDrinksIngredients();
  });

  useEffect(() => {
    handleUrlChange();
  }, []);

  return (
    <RecipesContext.Provider
      value={
        {
          setEmail,
          setSenha,
          handleEntrarButton,
          email,
          senha,
          url,
          titleByUrl,
          handleSearchButton,
          handleUrlChange,
          searching,
          isFetching,
          setIsFetching,
          setOptionSearch,
          setInputSearch,
          optionSearch,
          inputSearch,
          setCards,
          cards,
          loadResults,
          handleBuscarButton,
          handleMealSurpriseButton,
          handleDrinkSurpriseButton,
          handleMealIngredientButton,
          handleDrinksIngredientsButton,
          getMealsIngredients,
          getDrinksIngredients }
      }
    >
      { children }
    </RecipesContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
};

export default Provider;
