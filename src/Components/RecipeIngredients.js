import React from 'react';
import PropTypes from 'prop-types';

function RecipeIngredients(props) {
  const { recipeIngredients } = props;
  return (
    <div>
      {recipeIngredients.map((ingredient, index) => {
        const ingredientName = Object.keys(ingredient);
        const ingredientQty = Object.values(ingredient);
        return (
          <p
            key={ ingredientName[0] }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            { `${ingredientName[0]}: ${ingredientQty[0]} ` }
          </p>
        );
      })}
    </div>
  );
}

RecipeIngredients.propTypes = {
  recipeIngredients: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RecipeIngredients;
