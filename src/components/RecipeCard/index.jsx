import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default function RecipeCard({ id, meal }) {
  return (
    <div
      className="recipe-card"
      data-testid={ `${id}-recipe-card` }
    >
      <img
        alt="recipe"
        src={ meal.strMealThumb ? meal.strMealThumb : meal.strDrinkThumb }
        data-testid={ `${id}-card-img` }
      />
      <p data-testid={ `${id}-card-name` }>
        { meal.strMeal ? meal.strMeal : meal.strDrink }
      </p>
    </div>
  );
}

RecipeCard.propTypes = {
  id: PropTypes.number.isRequired,
  meal: PropTypes.shape({
    strMealThumb: PropTypes.string.isRequired,
    strDrinkThumb: PropTypes.string.isRequired,
    strMeal: PropTypes.string.isRequired,
    strDrink: PropTypes.string.isRequired,
  }).isRequired,
};
