import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import allActions from '../actions';

function Cocktails() {
  const state = useSelector(({ mainpage }) => mainpage);
  const { drinks, isLoading, drinkCategories } = state;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allActions.renderSearchIcon());
    dispatch(allActions.changePageTitle('Comidas'));
    dispatch(allActions.fetchCards(false));
  }, [dispatch]);

  if (isLoading) {
    return (
      <h1>Carregando...</h1>
    );
  }
  return (
    <div>
      <Header />
      {drinkCategories.map((category, index) => {
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
      {drinks.map((drink, index) => {
        const CARDS_NUMBER = 12;
        if (index < CARDS_NUMBER) {
          return (
            <div
              data-testid={ `${index}-recipe-card` }
              key={ `drink-card-${index}` }
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
      })}
    </div>
  );
}

export default Cocktails;
