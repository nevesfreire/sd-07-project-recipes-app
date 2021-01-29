import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function CustomCardIngredientsFood({ index, meal }) {
  const { strIngredient } = meal;
  return (
    <div>
      <Link to="/comidas">
        <p data-testid={ `${index}-ingredient-card` }>
          { `Ingredientes ${index}` }
        </p>
        <img
          data-testid={ `${index}-card-img` }
          src={ `https://www.themealdb.com/images/ingredients/${strIngredient}.png` }
          alt="Ingredientes"
        />
        <p data-testid={ `${index}-card-name` }>{ strIngredient }</p>
      </Link>
    </div>
  );
}

CustomCardIngredientsFood.propTypes = {
  index: PropTypes.number.isRequired,
  meal: PropTypes.shape({
    strIngredient: PropTypes.string.isRequired,
    strMealThumb: PropTypes.string.isRequired,
    idIngredient: PropTypes.number.isRequired,
  }).isRequired,
};
