import React, { useContext } from 'react';
import { Carousel } from 'react-bootstrap';
import RecipeContext from '../context/RecipeContext';

function DrinkRecom() {
  const MAX_ARRAY = 6;
  const { data } = useContext(RecipeContext);
  const drinks = [...data.drink];
  if (drinks.length > MAX_ARRAY) drinks.length = MAX_ARRAY;
  const interval = 1500;

  const ListCardsDrink = (cardsDrinks) => (
    <div>
      <Carousel>
        { cardsDrinks.map((drink, index) => (
          <Carousel.Item
            interval={ interval }
            key={ drink.idDrink }
            data-testid={ `${index}-recomendation-card` }
          >

            <div data-testid={ `${index}-recipe-card` } key={ drink.idDrink }>
              <Carousel.Caption>
                <h5 data-testid={ `${index}-recomendation-title` }>{drink.strDrink}</h5>
              </Carousel.Caption>
              <img
                style={ { width: '20%' } }
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
                data-testid={ `${index}-card-img` }
              />
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
  return ListCardsDrink(drinks);
}

export default DrinkRecom;
