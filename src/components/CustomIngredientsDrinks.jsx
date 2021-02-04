import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function CustomIngredientsDrinks({ index, drink, dispatch }) {
  const { strIngredient1 } = drink;
  return (
    <div>
      <Link to="/bebidas" onClick={ () => dispatch(strIngredient1) }>
        <p data-testid={ `${index}-ingredient-card` }>
          { `Ingredientes ${index}` }
        </p>
        <img
          data-testid={ `${index}-card-img` }
          src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
          alt="Ingredientes"
        />
        <p data-testid={ `${index}-card-name` }>{ strIngredient1 }</p>
      </Link>
    </div>
  );
}

CustomIngredientsDrinks.propTypes = {
  index: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  drink: PropTypes.shape({
    strIngredient1: PropTypes.string.isRequired,
  }).isRequired,
};
