import React from 'react';
import PropTypes from 'prop-types';

export default function Ingredients({ data }) {
  const minDataLength = 1;
  const maxIngredients = 20;
  if (data.length < minDataLength) return null;

  const ingredients = [];
  const measures = [];
  for (let index = 1; index <= maxIngredients; index += 1) {
    const ingredient = data[`strIngredient${index}`];
    if (ingredient !== '') ingredients.push(ingredient);
    const measure = data[`strMeasure${index}`];
    if (measure !== '') measures.push(measure);
  }

  return (
    ingredients.map((ingredient, index) => (
      <li
        key={ index }
        data-testid={ `${index}-ingredient-name-and-measure` }
      >
        {`${ingredient} - ${measures[index]}`}
      </li>
    ))
  );
}

Ingredients.propTypes = {
  data: PropTypes.objectOf(PropTypes.string).isRequired,
};
