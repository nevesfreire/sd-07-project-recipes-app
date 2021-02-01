import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import FoodAppContext from '../context/FoodAppContext';

function Ingredient({ recipes }) {
  const { detailRecipe } = useContext(FoodAppContext);
  const { meals } = detailRecipe;
  const { drinks } = detailRecipe;

  const details = recipes === 'comidas' ? meals : drinks;
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
      <h3>Ingredient</h3>
      <div className="div-ingredient">
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
    </div>
  );
}

Ingredient.propTypes = {
  recipes: PropTypes.string.isRequired,
};

export default Ingredient;
