import React, { useContext } from 'react';
import RecipeContext from '../context/RecipeContext';

function DrinkRecom() {
  const MAX_ARRAY = 6;
  const { data } = useContext(RecipeContext);
  const drinks = [...data.drink];
  if (drinks.length > MAX_ARRAY) drinks.length = MAX_ARRAY;

  const ListCardsDrink = (cardsDrinks) => (
    <div>
      {
        cardsDrinks.map((drink, index) => (
          <div data-testid={ `${index}-recipe-card` } key={ drink.idDrink }>
            <h5 data-testid={ `${index}-card-name` }>{drink.strDrink}</h5>
            <img
              style={ { width: '5%' } }
              src={ drink.strDrinkThumb }
              alt={ drink.strDrink }
              data-testid={ `${index}-card-img` }
            />
          </div>
        ))
      }
    </div>
  );
  return ListCardsDrink(drinks);
}

export default DrinkRecom;
