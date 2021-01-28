import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function Card(props) {
  const {
    recipe,
    index,
    isFood,
  } = props;
  return (
    <div key={ index } data-testid={ `${index}-recipe-card` }>
      {isFood
        ? (
          <div>
            <Link to={ `/comidas/${recipe.idMeal}` }>
              <img
                src={ recipe.strMealThumb }
                data-testid={ `${index}-card-img` }
                alt="Meal"
              />
              <h2
                data-testid={ `${index}-card-name` }
              >
                {recipe.strMeal}
              </h2>
            </Link>
          </div>
        )
        : (
          <div>
            <Link to={ `/bebidas/${recipe.idDrink}` }>
              <img
                src={ recipe.strDrinkThumb }
                data-testid={ `${index}-card-img` }
                alt="Drink"
              />
              <h2
                data-testid={ `${index}-card-name` }
              >
                {recipe.strDrink}
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
  recipe: PropTypes.shape({
    idMeal: PropTypes.string.isRequired,
    idDrink: PropTypes.string.isRequired,
    strDrink: PropTypes.string.isRequired,
    strDrinkThumb: PropTypes.string.isRequired,
    strMeal: PropTypes.string.isRequired,
    strMealThumb: PropTypes.string.isRequired,
  }).isRequired,
};

export default Card;
