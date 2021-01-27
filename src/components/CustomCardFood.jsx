import React from 'react';
import PropTypes from 'prop-types';

export default function CustomCardFood({ index, meal }) {
  const { strMeal, strMealThumb } = meal;
  return (
    <div>
      <p data-testid={ `${index}-recipe-card` }>
        { `receita ${index}` }
      </p>
      <img data-testid={ `${index}-card-img` } src={ strMealThumb } alt="" />
      <p data-testid={ `${index}-card-name` }>{ strMeal }</p>
    </div>
  );
}

CustomCardFood.propTypes = {
  index: PropTypes.number.isRequired,
  meal: PropTypes.shape({
    strMeal: PropTypes.string.isRequired,
    strMealThumb: PropTypes.string.isRequired,
  }).isRequired,
};
