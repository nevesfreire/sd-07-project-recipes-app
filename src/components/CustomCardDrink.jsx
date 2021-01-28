import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function CustomCardDrink({ index, drink }) {
  const { strDrink, strDrinkThumb, idDrink } = drink;
  return (
    <div>
      <Link to={ `/bebidas/${idDrink}` }>
        <p data-testid={ `${index}-recipe-card` }>
          { `receita ${index}` }
        </p>
        <img data-testid={ `${index}-card-img` } src={ strDrinkThumb } alt="" />
        <p data-testid={ `${index}-card-name` }>{ strDrink }</p>
      </Link>
    </div>
  );
}

CustomCardDrink.propTypes = {
  index: PropTypes.number.isRequired,
  drink: PropTypes.shape({
    strDrink: PropTypes.string.isRequired,
    strDrinkThumb: PropTypes.string.isRequired,
    idDrink: PropTypes.number.isRequired,
  }).isRequired,
};
