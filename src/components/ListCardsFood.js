import React from 'react';
import { Link, useHistory } from 'react-router-dom';

function ListCardsFood(cardsFoods) {
  const { push } = useHistory();
  if (cardsFoods.length === 1) return push(`/comidas/${cardsFoods[0].idMeal}`);

  return (
    <div>
      {
        cardsFoods.map((food, index) => (
          <Link key={ food.idMeal } to={ { pathname: `/comidas/${food.idMeal}` } }>
            <div data-testid={ `${index}-recipe-card` }>
              <h5 data-testid={ `${index}-card-name` }>{food.strMeal}</h5>
              <img
                style={ { width: '30%' } }
                src={ food.strMealThumb }
                alt={ food.strfood }
                data-testid={ `${index}-card-img` }
              />
            </div>
          </Link>

        ))
      }
    </div>
  );
}

export default ListCardsFood;
