import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function CustomCardIngredientsFood({ index, meal }) {
  const { strMeal, strMealThumb, idMeal } = meal;
  return (
    <div>
      <Link to={ `/explorar/comidas/ingredientes/${idMeal}` }>
        <p data-testid={ `${index}-ingredient-card` }>
          { `Ingredientes ${index}` }
        </p>
        <img data-testid={ `${index}-card-img` } src={ strMealThumb } alt="" />
        <p data-testid={ `${index}-card-name` }>{ strMeal }</p>
      </Link>
    </div>
  );
}

CustomCardIngredientsFood.propTypes = {
  index: PropTypes.number.isRequired,
  meal: PropTypes.shape({
    strMeal: PropTypes.string.isRequired,
    strMealThumb: PropTypes.string.isRequired,
    idMeal: PropTypes.number.isRequired,
  }).isRequired,
};
