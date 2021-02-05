import React from 'react';
import { Link } from 'react-router-dom';

function ListCardsFoodCategory(cardsFoods) {
  const MAX_ARRAY = 12;
  if (cardsFoods.length > MAX_ARRAY) cardsFoods.length = MAX_ARRAY;

  return (
    <div>
      {
        cardsFoods.map((food, index) => (
          <Link key={ food.idMeal } to={ { pathname: `/comidas/${food.idMeal}` } }>
            <div data-testid={ `${index}-recipe-card` }>
              <img
                style={ { width: '30%' } }
                src={ food.strMealThumb }
                alt={ food.strfood }
                data-testid={ `${index}-card-img` }
              />
              <h5 data-testid={ `${index}-card-name` }>{food.strMeal}</h5>
            </div>
          </Link>
        ))
      }
    </div>
  );
}

export default ListCardsFoodCategory;
