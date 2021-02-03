import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { addRecipeProgress, ingredientIsSelected } from '../../services/localStorage';

export default function Ingredients({ data }) {
  const maxIngredients = 20;

  const ingredients = [];
  const measures = [];
  for (let index = 1; index <= maxIngredients; index += 1) {
    const ingredient = data[`strIngredient${index}`];
    if (ingredient !== '' && ingredient !== null && ingredient !== undefined) {
      ingredients.push(ingredient);
    }
    const measure = data[`strMeasure${index}`];
    if (measure !== '') measures.push(measure);
  }

  function recipeIsDone() {
    const checkboxes = Array.from(document.querySelectorAll('input[type=checkbox]'));
    const finishBtn = document.getElementById('finish-recipe');
    finishBtn.disabled = !checkboxes.every((item) => item.checked === true);
  }

  function selectIngredient(event) {
    const parentLabel = event.target.parentNode;
    addRecipeProgress(data.idMeal, event.target.name);
    if (ingredientIsSelected(data.idMeal, event.target.name)) {
      parentLabel.classList.add('checked');
      event.target.setAttribute('checked', 'true');
      recipeIsDone();
    } else {
      parentLabel.classList.remove('checked');
      event.target.removeAttribute('checked');
      recipeIsDone();
    }
  }

  function resumeRecipeProgress() {
    console.log(ingredients);
    ingredients.forEach((item) => {
      const label = document.getElementById(item);
      if (ingredientIsSelected(data.idMeal, item)) {
        label.classList.add('checked');
        label.children[0].setAttribute('checked', 'true');
      } else {
        label.classList.remove('checked');
        label.children[0].removeAttribute('checked');
      }
    });
  }

  useEffect(() => {
    resumeRecipeProgress();
    recipeIsDone();
  }, []);

  return (
    ingredients.map((ingredient, index) => (
      <div id="renderDone" key={ index }>
        <label
          htmlFor={ `checkbox${index}` }
          id={ ingredient }
          name={ ingredient }
          data-testid={ `${index}-ingredient-step` }
        >
          <input
            name={ ingredient }
            className="checkBoxIngredient"
            type="checkbox"
            id={ `checkbox${index}` }
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
