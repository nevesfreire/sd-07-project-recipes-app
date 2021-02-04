import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';

function FoodRecom() {
  const MAX_ARRAY = 6;
  const { data } = useContext(RecipeContext);
  const foods = [...data.food];
  if (foods.length > MAX_ARRAY) foods.length = MAX_ARRAY;

  const ListCardsFood = (cardsFoods) => {
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
                  style={ { width: '5%' } }
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
  };
  return ListCardsFood(foods);
}

export default FoodRecom;
