import React from 'react';
import { Link } from 'react-router-dom';

function ListCardsDrinkCategory(cardsDrinks) {
  const MAX_ARRAY = 12;
  if (cardsDrinks.length > MAX_ARRAY) cardsDrinks.length = MAX_ARRAY;

  return (
    <div>
      {
        cardsDrinks.map((drink, index) => (
          <Link key={ drink.idDrink } to={ { pathname: `/bebidas/${drink.idDrink}` } }>
            <div data-testid={ `${index}-recipe-card` }>
              <img
                style={ { width: '30%' } }
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
                data-testid={ `${index}-card-img` }
              />
              <h5 data-testid={ `${index}-card-name` }>{drink.strDrink}</h5>
            </div>
          </Link>
        ))
      }
    </div>
  );
}

export default ListCardsDrinkCategory;
