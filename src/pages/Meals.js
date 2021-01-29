import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import allActions from '../actions';

function Meals() {
  const state = useSelector(({ mainpage }) => mainpage);
  const { meals, isLoading, mealCategories } = state;
  const dispatch = useDispatch();
  const [filterOn, setFilterOn] = useState(false);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [cardsArray, setCardsArray] = useState([]);
  const [filter, setFilter] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    dispatch(allActions.renderSearchIcon());
    dispatch(allActions.changePageTitle('Comidas'));
    dispatch(allActions.fetchCards(true));
  }, [dispatch]);

  useEffect(() => {
    function checkFilter() {
      if (filterOn) {
        setCardsArray(filteredMeals);
      } else {
        setCardsArray(meals);
      }
    }
    checkFilter();
  }, [isLoading, filterOn]);

  useEffect(() => {
    const fetchFiltered = async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${filter}`);
      const json = await response.json();
      setFilteredMeals(json.meals);
      setFilterOn(true);
    };
    if (isFetching) {
      fetchFiltered();
    }
  }, [filter]);

  const turnFilterOn = (cat) => {
    if (filterOn) {
      setFilterOn(false);
    } else {
      setFilter(cat);
      setIsFetching(true);
    }
  };

  const renderFilters = (category, index) => {
    const CAT_NUMBER = 5;
    if (index < CAT_NUMBER) {
      return (
        <button
          type="button"
          key={ category.strCategory }
          data-testid={ `${category.strCategory}-category-filter` }
          onClick={ () => turnFilterOn(category.strCategory) }
        >
          {category.strCategory}
        </button>
      );
    } return null;
  };

  const renderCards = (meal, index) => {
    const CARDS_NUMBER = 12;
    if (index < CARDS_NUMBER) {
      return (
        <Link to={ `/comidas/${meal.idMeal}` }>
          <div
            data-testid={ `${index}-recipe-card` }
            key={ `card-${index}` }
          >
            <img
              key={ `meal-thumb-${index}` }
              src={ meal.strMealThumb }
              alt="meal thumb"
              data-testid={ `${index}-card-img` }
            />
            <h2
              key={ meal.strMeal }
              data-testid={ `${index}-card-name` }
            >
              {meal.strMeal}
            </h2>
          </div>
        </Link>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <h1>Carregando...</h1>
    );
  }

  return (
    <div>
      <Header />
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => setFilterOn(false) }
      >
        All
      </button>
      {mealCategories.map((category, index) => renderFilters(category, index))}
      {cardsArray.map((meal, index) => renderCards(meal, index))}
    </div>
  );
}

export default Meals;
