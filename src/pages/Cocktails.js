import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import allActions from '../actions';
import { useHistory } from 'react-router-dom';

function Cocktails() {
  const state = useSelector(({ mainpage }) => mainpage);
  const { drinks, isLoading, drinkCategories } = state;
  const dispatch = useDispatch();
  const [filterOn, setFilterOn] = useState(false);
  const [filteredDrinks, setFilteredDrinks] = useState([]);
  const [cardsArray, setCardsArray] = useState([]);
  const [filter, setFilter] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const history = useHistory();

  useEffect(() => {
    dispatch(allActions.renderSearchIcon());
    dispatch(allActions.changePageTitle('Bebidas'));
    dispatch(allActions.fetchCards(false));
  }, [dispatch]);

  const redirectToDetails = (id) => {
    history.push(`/bebidas/${id}`);
  }

  useEffect(() => {
    function checkFilter() {
      if (filterOn) {
        setCardsArray(filteredDrinks);
      } else {
        setCardsArray(drinks);
      }
    };
    checkFilter();
  }, [isLoading, filterOn]);

  useEffect(() => {
    const fetchFiltered = async () => {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filter}`);
      const json = await response.json();
      setFilteredDrinks(json.drinks);
      setFilterOn(true);
    }
      if(isFetching) {
        fetchFiltered();
      }
  }, [filter])

  const turnFilterOn = (cat) => {
    if (filterOn) {
      setFilterOn(false);
    } else {
      setFilter(cat);
      setIsFetching(true);
    }
  }

  const renderFilters = (category, index) => {
    const CAT_NUMBER = 5;
    if (index < CAT_NUMBER) {
      return (
        <button
          type="button"
          key={ category.strCategory }
          data-testid={ `${category.strCategory}-category-filter` }
          onClick={() => turnFilterOn(category.strCategory)}
        >
          {category.strCategory}
        </button>
      );
    } return null;
  };

  const renderCards = (drink, index) => {
    const CARDS_NUMBER = 12;
    if (index < CARDS_NUMBER) {
      return (
        <div
          data-testid={ `${index}-recipe-card` }
          key={ `drink-card-${index}` }
          onClick={() => redirectToDetails(drink.idDrink)}
        >
          <img
            key={ `drink-thumb-${index}` }
            src={ drink.strDrinkThumb }
            alt="drink thumb"
            data-testid={ `${index}-card-img` }
          />
          <h2
            key={ drink.strDrink }
            data-testid={ `${index}-card-name` }
          >
            {drink.strDrink}
          </h2>
        </div>
      );
    }
    return null;
  }

  if (isLoading) {
    return (
      <h1>Carregando...</h1>
    );
  }
  return (
    <div>
      <Header />
      <button
        data-testid="All-category-filter"
        onClick={() => setFilterOn(false)}
      >All</button>
      {drinkCategories.map((category, index) => renderFilters(category, index))}
      {cardsArray.map((drink, index) => renderCards(drink, index))}
    </div>
  );
}

export default Cocktails;
