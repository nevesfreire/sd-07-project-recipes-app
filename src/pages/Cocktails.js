import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import allActions from '../actions';

function Cocktails() {
  const state = useSelector(({ mainpage }) => mainpage);
  const { drinks, isLoading } = state;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allActions.renderSearchIcon());
    dispatch(allActions.changePageTitle('Comidas'));
    dispatch(allActions.fetchCards(false));
  }, [dispatch]);

  if (isLoading) {
    return (
      <h1>Carregando...</h1>
    )
  }
  return (
    <div>
      <Header />
      {drinks.map((drink, index) => {
        const CARDS_NUMBER = 12;
        if (index < CARDS_NUMBER) return (
          <div
            data-testid={`${index}-recipe-card`}
            key={`drink-card-${index}`}
          >
            <img
              key={`drink-thumb-${index}`}
              src={drink.strDrinkThumb}
              alt="drink thumb"
              data-testid={`${index}-card-img`}
            />
            <h2
              key={drink.strDrink}
              data-testid={`${index}-card-name`}
            >{drink.strDrink}</h2>
          </div>
        );
          return null;
        })
      }
    </div>
  );
}

export default Cocktails;
