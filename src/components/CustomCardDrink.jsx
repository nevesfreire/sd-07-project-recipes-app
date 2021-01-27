import React from 'react';
import PropTypes from 'prop-types';

export default function CustomCardDrink({ index, drink }) {
  const { strDrink, strDrinkThumb } = drink;
  return (
    <div>
      <p data-testid={ `${index}-recipe-card` }>
        { `receita ${index}` }
      </p>
      <img data-testid={ `${index}-card-img` } src={ strDrinkThumb } alt="" />
      <p data-testid={ `${index}-card-name` }>{ strDrink }</p>
    </div>
  );
}

CustomCardDrink.propTypes = {
  index: PropTypes.number.isRequired,
  drink: PropTypes.shape({
    strDrink: PropTypes.string.isRequired,
    strDrinkThumb: PropTypes.string.isRequired,
  }).isRequired,
};
