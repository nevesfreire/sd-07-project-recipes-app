import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import FoodAppContext from '../context/FoodAppContext';

function Ingredient() {
  const { detailRecipe } = useContext(FoodAppContext);
  const history = useHistory();
  const { location } = history;
  const { pathname } = location;

  const { meals } = detailRecipe;
  const { drinks } = detailRecipe;
  const name = pathname.split('/');

  const details = name[1] === 'comidas' ? meals : drinks;
  const zero = 0;
  let ingredients = [];
  let measures = [];
  if (details) {
    const keyAndValueArray = Object.entries(details[0]);
    ingredients = keyAndValueArray.filter(([key, value]) => (
      key.includes('strIngredient') && (value !== null && value.length > zero)
    ));
    measures = keyAndValueArray.filter(([key, value]) => (
      key.includes('strMeasure') && (value !== null && value.length > zero)
    ));
  }

  return (
    <div>
      {ingredients.map(([key, value], index) => (
        <p
          key={ key }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          -
          { value }
          -
          { measures[index][1] }
        </p>
      ))}
    </div>
  );
}

export default Ingredient;
