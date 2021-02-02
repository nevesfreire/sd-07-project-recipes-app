import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { addRecipeProgress, ingredientIsSelected } from '../../services/localStorage';

export default function Ingredients({ data }) {
  const minDataLength = 1;
  const maxIngredients = 20;
  if (data.length < minDataLength) return null;

  const ingredients = [];
  const measures = [];
  for (let index = 1; index <= maxIngredients; index += 1) {
    const ingredient = data[`strIngredient${index}`];
    if (ingredient !== '' && ingredient !== null) ingredients.push(ingredient);
    const measure = data[`strMeasure${index}`];
    if (measure !== '') measures.push(measure);
  }

  function recipeIsDone() {
    const checkboxes = Array.from(document.querySelectorAll('input[type=checkbox]'));
    console.log(checkboxes[0]);
    const finishBtn = document.getElementById('finish-recipe');
    finishBtn.disabled = !checkboxes.every((item) => item.checked === true);
  }

  function selectIngredient(event) {
    // const parentLabel = event.target.parentNode;
    addRecipeProgress(data.idMeal, event.target.name);
    if (ingredientIsSelected(data.idMeal, event.target.name)) {
      event.target.setAttribute('checked', 'true');
      recipeIsDone();
    } else {
      event.target.removeAttribute('checked');
      recipeIsDone();
    }
  }

  // useEffect(() => {
  //   recipeIsDone();
  // }, []);

  return (
    ingredients.map((ingredient, index) => (
      <div key={ index }>
        <label
          htmlFor={ `checkbox${index}` }
          name={ ingredient }
        >
          <input
            name={ ingredient }
            className="checkBoxIngredient"
            type="checkbox"
            id={ `checkbox${index}` }
            data-testid={ `${index}-ingredient-step` }
            onClick={ (event) => selectIngredient(event) }
          />
          {`${ingredient} - ${measures[index]}`}
        </label>
      </div>
    ))
  );
}

Ingredients.propTypes = {
  data: PropTypes.objectOf(PropTypes.string).isRequired,
};
