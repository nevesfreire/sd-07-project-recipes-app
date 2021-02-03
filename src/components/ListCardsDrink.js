import React from 'react';
import { useHistory } from 'react-router-dom';

function ListCardsDrink(cardsDrinks) {
  const { push } = useHistory();
  console.log(cardsDrinks);
  if (cardsDrinks.length === 1) return push(`/bebidas/${cardsDrinks[0].idDrink}`);

  return (
    <div>
      {
        cardsDrinks.map((drink, index) => (
          <div data-testid={ `${index}-recipe-card` } key={ drink.idDrink }>
            <h5 data-testid={ `${index}-card-name` }>{drink.strDrink}</h5>
            <img
              style={ { width: '30%' } }
              src={ drink.strDrinkThumb }
              alt={ drink.strDrink }
              data-testid={ `${index}-card-img` }
            />
          </div>
        ))
      }
    </div>
  );
}

export default ListCardsDrink;
