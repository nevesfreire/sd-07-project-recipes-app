import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';

function SearchExecButton() {
  const {
    optionSearch,
    inputSearch,
    setIsFetching,
    setCards,
  } = useContext(RecipesContext);

  const history = useHistory();
  const urlComidas = '/comidas';
  const urlBebidas = '/bebidas';
  const path = history.location.pathname;
  const zero = 0;
  const doze = 12;

  const mealIngredient = (path === urlComidas && optionSearch === 'ingredient');
  const mealName = (path === urlComidas && optionSearch === 'name');
  const mealLetter = (path === urlComidas && optionSearch === 'letter');
  const drinkIngredient = (path === urlBebidas && optionSearch === 'ingredient');
  const drinkName = (path === urlBebidas && optionSearch === 'name');
  const drinkLetter = (path === urlBebidas && optionSearch === 'letter');

  const handleExecSearchButton = async () => {
    // eslint-disable-next-line no-alert
    const failure = () => alert(
      'Sinto muito, não encontramos nenhuma receita para esses filtros.',
    );
    if (optionSearch === 'letter' && inputSearch.length > 1) {
      // eslint-disable-next-line no-alert
      return (alert('Sua busca deve conter somente 1 (um) caracter'));
    }
    if (mealIngredient) {
      const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputSearch}`;
      const { meals } = await fetch(endpoint).then((response) => response.json())
        .catch(failure());
      const twelveCards = meals.slice(zero, doze);
      setCards(twelveCards);
    } else if (mealName) {
      const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputSearch}`;
      const { meals } = await fetch(endpoint).then((response) => response.json())
        .catch(failure());
      const twelveCards = meals.slice(zero, doze);
      setCards(twelveCards);
    } else if (mealLetter) {
      const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${inputSearch[0]}`;
      const { meals } = await fetch(endpoint).then((response) => response.json())
        .catch(failure());
      const twelveCards = meals.slice(zero, doze);
      setCards(twelveCards);
    } else if (drinkIngredient) {
      const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputSearch}`;
      const { drinks } = await fetch(endpoint).then((response) => response.json())
        .catch(failure());
      const twelveCards = drinks.slice(zero, doze);
      setCards(twelveCards);
    } else if (drinkName) {
      const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputSearch}`;
      const { drinks } = await fetch(endpoint).then((response) => response.json())
        .catch(failure());
      const twelveCards = drinks.slice(zero, doze);
      setCards(twelveCards);
    } else if (drinkLetter) {
      const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputSearch[0]}`;
      const { drinks } = await fetch(endpoint).then((response) => response.json())
        .catch(failure());
      const twelveCards = drinks.slice(zero, doze);
      setCards(twelveCards);
    }
    setIsFetching(false);
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
