import React, { useContext, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';
import {
  fetchSearchMealIngredient,
  fetchSearchMealName,
  fetchSearchMealLetter,
  fetchSearchDrinkIngredient,
  fetchSearchDrinkName,
  fetchSearchDrinkLetter,
} from '../../services/api';

function SearchExecButton() {
  const {
    optionSearch,
    inputSearch,
    setIsFetching,
    setLoadResults,
    setCards,
    clickExecSearch,
    setClickExecSearch,
  } = useContext(RecipesContext);

  const history = useHistory();

  const urlComidas = '/comidas';
  const urlBebidas = '/bebidas';

  const mealIngredient = (
    history.location.pathname === urlComidas && optionSearch === 'ingredient');
  const mealName = (
    history.location.pathname === urlComidas && optionSearch === 'name');
  const mealLetter = (
    history.location.pathname === urlComidas && optionSearch === 'letter');
  const drinkIngredient = (
    history.location.pathname === urlBebidas && optionSearch === 'ingredient');
  const drinkName = (
    history.location.pathname === urlBebidas && optionSearch === 'name');
  const drinkLetter = (
    history.location.pathname === urlBebidas && optionSearch === 'letter');
  const getCards = async () => {
    if (mealIngredient) {
      setCards(await fetchSearchMealIngredient(inputSearch));
    } else if (mealName) {
      setCards(await fetchSearchMealName(inputSearch));
    } else if (mealLetter) {
      setCards(await fetchSearchMealLetter(inputSearch[0]));
    } else if (drinkIngredient) {
      setCards(await fetchSearchDrinkIngredient(inputSearch));
    } else if (drinkName) {
      setCards(await fetchSearchDrinkName(inputSearch));
    } else if (drinkLetter) {
      setCards(await fetchSearchDrinkLetter(inputSearch[0]));
    }
    setIsFetching(false);
    setLoadResults(true);
  };

  useEffect(() => {
    getCards();
  }, [clickExecSearch]);

  const handleExecSearchButton = () => {
    setClickExecSearch(clickExecSearch + 1);
  };

  return (
    <Button
      type="button"
      data-testid="exec-search-btn"
      onClick={ handleExecSearchButton }
      variant="secondary"
    >
      Buscar
    </Button>
  );
}

export default SearchExecButton;
