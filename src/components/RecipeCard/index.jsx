import React from 'react';
import './style.css';

export default function RecipeCard({ id, recipeType }) {
  return (
    <div
      className="recipe-card"
      data-testid={`${id}-recipe-card`}
    >
      <img
        src="https://www.themealdb.com/images/media/meals/58oia61564916529.jpg"
        data-testid={`${id}-card-img`}
      />
      <p>comida tal</p>
    </div>
  )
}
