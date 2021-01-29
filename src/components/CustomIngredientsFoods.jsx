import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function CustomIngredientsFoods({ index, meal, dispatch }) {
  const { strIngredient } = meal;
  return (
    <div>
      <Link to="/comidas" onClick={ () => dispatch(strIngredient) }>
        <p data-testid={ `${index}-ingredient-card` }>
          { `Ingredientes ${index}` }
        </p>
        <img
          data-testid={ `${index}-card-img` }
          src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
          alt="Ingredientes"
        />
        <p data-testid={ `${index}-card-name` }>{ strIngredient }</p>
      </Link>
    </div>
  );
}

CustomIngredientsFoods.propTypes = {
  index: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  meal: PropTypes.shape({
    strIngredient: PropTypes.string.isRequired,
    strMealThumb: PropTypes.string.isRequired,
    idIngredient: PropTypes.number.isRequired,
  }).isRequired,
};
