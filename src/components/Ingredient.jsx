import React, { useContext } from 'react';
import FoodAppContext from '../context/FoodAppContext';

function Ingredient() {
  const { detailRecipe } = useContext(FoodAppContext);
  const { meals } = detailRecipe;
  let ingredients = []
  let measures = []
  if (meals) {
    const keyAndValueArray = Object.entries(meals[0]);
    ingredients = keyAndValueArray.filter(([key, value]) => (
      key.includes('strIngredient') && (value !== null && value.length > 1)
    ))
    measures = keyAndValueArray.filter(([key, value]) => (
      key.includes('strMeasure') && (value !== null && value.length > 1)
    ))
  }


  return (
    <div>
      {ingredients.map(([key, value], index) => (
        <p
          key={key}
          data-testid={`${index}-ingredient-name-and-measure`}
          >- {value} {measures[index][1]}</p>
      ))}
    </div>
  );
}

export default Ingredient;
