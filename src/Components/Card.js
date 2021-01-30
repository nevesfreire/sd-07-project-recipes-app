import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function Card(props) {
  const {
    item,
    index,
    isFood,
    isFoodIngredient,
    isDrinkIngredient,
  } = props;

  if (isFoodIngredient) {
    return (
      <Link
        to={ `/explorar/comidas/ingredientes/${item.strIngredient}` }
      >
        <div key={ index } data-testid={ `${index}-ingredient-card` }>
          <img
            src={ `https://www.themealdb.com/images/ingredients/${item.strIngredient}-Small.png` }
            data-testid={ `${index}-card-img` }
            alt="Ingredient"
          />
          <h2
            data-testid={ `${index}-card-name` }
          >
            {item.strIngredient}
          </h2>
        </div>
      </Link>
    );
  }
  if (isDrinkIngredient) {
    const nameIngredient = item.strIngredient1.replace(
      / /g, '_',
    );
    return (
      <Link
        to={
          `/explorar/bebidas/ingredientes/${nameIngredient}`
        }
      >
        <div key={ index } data-testid={ `${index}-ingredient-card` }>
          <img
            src={ `https://www.thecocktaildb.com/images/ingredients/${item.strIngredient1}-Small.png` }
            data-testid={ `${index}-card-img` }
            alt="Ingredient"
          />
          <h2
            data-testid={ `${index}-card-name` }
          >
            {item.strIngredient1}
          </h2>
        </div>
      </Link>
    );
  }
  return (
    <div key={ index } data-testid={ `${index}-recipe-card` }>
      {isFood
        ? (
          <div>
            <Link to={ `/comidas/${item.idMeal}` }>
              <img
                src={ item.strMealThumb }
                data-testid={ `${index}-card-img` }
                alt="Meal"
              />
              <h2
                data-testid={ `${index}-card-name` }
              >
                {item.strMeal}
              </h2>
            </Link>
          </div>
        )
        : (
          <div>
            {console.log(item)}
            <Link to={ `/bebidas/${item.idDrink}` }>
              <img
                src={ item.strDrinkThumb }
                data-testid={ `${index}-card-img` }
                alt="Drink"
              />
              <h2
                data-testid={ `${index}-card-name` }
              >
                {item.strDrink}
              </h2>
            </Link>
          </div>
        )}
    </div>
  );
}

Card.propTypes = {
  index: PropTypes.number.isRequired,
  isFood: PropTypes.bool.isRequired,
  isFoodIngredient: PropTypes.bool.isRequired,
  isDrinkIngredient: PropTypes.bool.isRequired,
  item: PropTypes.shape({
    idMeal: PropTypes.string.isRequired,
    idDrink: PropTypes.string.isRequired,
    strDrink: PropTypes.string.isRequired,
    strDrinkThumb: PropTypes.string.isRequired,
    strMeal: PropTypes.string.isRequired,
    strMealThumb: PropTypes.string.isRequired,
    strIngredient: PropTypes.string.isRequired,
    strIngredient1: PropTypes.string.isRequired,
  }).isRequired,
};

export default Card;
