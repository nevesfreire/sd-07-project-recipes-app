import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function CustomCardFood({ index, recipe, recipeType }) {
  const recipeId = (recipeType === 'comidas') ? recipe.idMeal : recipe.idDrink;
  return (
    <div>
      <Link to={ `/${recipeType}/${recipeId}` }>
        <p data-testid={ `${index}-recipe-card` }>
          { `receita ${index}` }
        </p>
        <img
          data-testid={ `${index}-card-img` }
          src={ (recipeType === 'comidas') ? recipe.strMealThumb : recipe.strDrinkThumb }
          alt=""
        />
        <p
          data-testid={ `${index}-card-name` }
        >
          { (recipeType === 'comidas') ? recipe.strMeal : recipe.strDrink }
        </p>
      </Link>
    </div>
  );
}

CustomCardFood.propTypes = {
  index: PropTypes.number.isRequired,
  recipeType: PropTypes.string.isRequired,
  recipe: PropTypes.shape({
    strMeal: PropTypes.string.isRequired,
    strDrink: PropTypes.string.isRequired,
    strMealThumb: PropTypes.string.isRequired,
    strDrinkThumb: PropTypes.string.isRequired,
    idMeal: PropTypes.number.isRequired,
    idDrink: PropTypes.number.isRequired,
  }).isRequired,
};
