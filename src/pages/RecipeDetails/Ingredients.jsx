import React from 'react';
import PropTypes from 'prop-types';

export default function Ingredients({ recipeDetails }) {
  const teste = Object.keys(recipeDetails);
  const ingredients = teste.filter((item) => item.includes('strIngredient'));
  const measures = teste.filter((item) => item.includes('strMeasure'));
  const arrayVazio = [];

  ingredients.forEach((ingredient, index) => {
    if (
      (recipeDetails[ingredient]
        && recipeDetails[ingredient] !== ' '
        && recipeDetails[ingredient] !== null)) {
      arrayVazio.push([recipeDetails[ingredient], recipeDetails[measures[index]]]);
    }
  });

  return (
    <ul className="container-ingredients">
      { arrayVazio.map((name, index) => (
        <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
          { name[1] !== null ? `${name[0]} - ${name[1]}` : `${name[0]}` }
        </li>
      ))}
    </ul>
  );
}

Ingredients.propTypes = {
  recipeDetails: PropTypes.shape(PropTypes.string).isRequired,
};
