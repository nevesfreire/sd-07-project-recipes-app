import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import RecipeContext from '../context/RecipeContext';

function FoodRecom() {
  const MAX_ARRAY = 6;
  const { data } = useContext(RecipeContext);
  const foods = [...data.food];
  if (foods.length > MAX_ARRAY) foods.length = MAX_ARRAY;

  const ListCardsFood = (cardsFoods) => {
    const { push } = useHistory();
    const interval = 1500;
    if (cardsFoods.length === 1) return push(`/comidas/${cardsFoods[0].idMeal}`);
    return (
      <div>

        <Carousel>
          {cardsFoods.map((food, index) => (
            <Carousel.Item
              interval={ interval }
              key={ food.idMeal }
              data-testid={ `${index}-recomendation-card` }
            >
              <Link key={ food.idMeal } to={ { pathname: `/comidas/${food.idMeal}` } }>
                <div data-testid={ `${index}-recipe-card` }>
                  <Carousel.Caption>
                    <h5 data-testid={ `${index}-recomendation-title` }>{food.strMeal}</h5>
                  </Carousel.Caption>
                  <img
                    style={ { width: '20%' } }
                    src={ food.strMealThumb }
                    alt={ food.strfood }
                    data-testid={ `${index}-card-img` }
                  />
                </div>
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>

      </div>
    );
  };
  return ListCardsFood(foods);
}

export default FoodRecom;
