import React from 'react';
import './style.css';

export default function RecipeCard({ id, meal }) {
  return (
    <div
      className="recipe-card"
      data-testid={`${id}-recipe-card`}
    >
      <img
        src={ meal.strMealThumb ? meal.strMealThumb : meal.strDrinkThumb }
        data-testid={`${id}-card-img`}
      />
      <p data-testid={`${id}-card-name`}>
        { meal.strMeal ? meal.strMeal : meal.strDrink }
      </p>
    </div>
  )
}
