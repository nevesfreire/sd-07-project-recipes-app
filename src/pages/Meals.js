import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import allActions from '../actions';

function Meals() {
  const state = useSelector(({ mainpage }) => mainpage);
  const { meals, isLoading, mealCategories } = state;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allActions.renderSearchIcon());
    dispatch(allActions.changePageTitle('Comidas'));
    dispatch(allActions.fetchCards(true));
  }, [dispatch]);

  if (isLoading) {
    return (
      <h1>Carregando...</h1>
    );
  }
  return (
    <div>
      <Header />
      {mealCategories.map((category, index) => {
        const CAT_NUMBER = 5;
        if (index < CAT_NUMBER) {
          return (
            <button
              type="button"
              key={ category.strCategory }
              data-testid={ `${category.strCategory}-category-filter` }
            >
              {category.strCategory}
            </button>
          );
        } return null;
      })}
      {meals.map((meal, index) => {
        const CARDS_NUMBER = 12;
        if (index < CARDS_NUMBER) {
          return (
            <div
              data-testid={ `${index}-recipe-card` }
              key={ `meal-card-${index}` }
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
          );
        }
        return null;
      })}
    </div>
  );
}

export default Meals;
