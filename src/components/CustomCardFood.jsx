import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function CustomCardFood({ index, meal }) {
  const { strMeal, strMealThumb, idMeal } = meal;
  return (
    <div>
      <Link to={ `/comidas/${idMeal}` }>
        <p data-testid={ `${index}-recipe-card` }>
          { `receita ${index}` }
        </p>
        <img data-testid={ `${index}-card-img` } src={ strMealThumb } alt="" />
        <p data-testid={ `${index}-card-name` }>{ strMeal }</p>
      </Link>
    </div>
  );
}

CustomCardFood.propTypes = {
  index: PropTypes.number.isRequired,
  meal: PropTypes.shape({
    strMeal: PropTypes.string.isRequired,
    strMealThumb: PropTypes.string.isRequired,
    idMeal: PropTypes.number.isRequired,
  }).isRequired,
};
