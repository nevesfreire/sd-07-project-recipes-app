import PropTypes from 'prop-types';
import React from 'react';

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
          </div>
        )
        : (
          <div>
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
          </div>
        )}
    </div>
  );
}

Card.propTypes = {
  index: PropTypes.string.isRequired,
  isFood: PropTypes.bool.isRequired,
  recipe: PropTypes.shape({
    strDrink: PropTypes.string.isRequired,
    strDrinkThumb: PropTypes.string.isRequired,
    strMeal: PropTypes.string.isRequired,
    strMealThumb: PropTypes.string.isRequired,
  }).isRequired,
};

export default Card;
