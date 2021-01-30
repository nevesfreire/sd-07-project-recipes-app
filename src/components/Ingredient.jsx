import React, { useContext } from 'react';

import FoodAppContext from '../context/FoodAppContext';

function Ingredient() {
  const { detailRecipe } = useContext(FoodAppContext);
  const { meals } = detailRecipe;
  if (meals) {
    const test = (Object.entries(meals[0]));
    const t = test.filter(([key, value]) => (
      key.includes('strIngredient') && (value !== null && value.length > 0)
    ));
    console.log(t);
  }
  return (
    <div>
      <p>
        {` - ${detailRecipe[0]}[strIngredient${1}] - ${detailRecipe[0]}[strMeasure${1}]`}
      </p>
    </div>
  );
}

export default Ingredient;
