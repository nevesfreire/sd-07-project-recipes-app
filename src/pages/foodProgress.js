import React from 'react';
import { useHistory } from 'react-router-dom';

function FoodProgress() {
  const food = useHistory().location.state[0];
  console.log(food);

  const arrayFood = Object.keys(food).filter((item) => item.includes('Ingredient'));
  console.log(arrayFood);

  for (const i of arrayFood) {
    console.log(i);
  }

  return (
    <div>
      <img
        style={ { width: '30%' } }
        src={ food.strMealThumb }
        alt={ food.strMeal }
        data-testid="recipe-photo"
      />
      <h3 data-testid="recipe-title">{food.strMeal}</h3>
      <button data-testid="share-btn" type="button">Compartilhar</button>
      <button data-testid="favorite-btn" type="button">Favorito</button>
      <p data-testid="recipe-category">{food.strCategory}</p>
      {

      }
    </div>
  );
}

export default FoodProgress;
