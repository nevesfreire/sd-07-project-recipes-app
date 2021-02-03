import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import '../styles/details.css';

import FoodAppContext from '../context/FoodAppContext';
import useInProgressRecipe from '../hooks/useInProgressRecipe';

function Ingredient({ recipes, inProgress, id }) {
  const { detailRecipe } = useContext(FoodAppContext);
  const [handleChange, inProgressRecipes] = useInProgressRecipe();
  const { meals } = detailRecipe;
  const { drinks } = detailRecipe;
  const details = recipes === 'comidas' ? meals : drinks;
  const zero = 0;
  const two = 2;
  let ingredients = [];
  let measures = [];

  const toogleChecked = (ingredient) => {
    if (recipes === 'comidas') {
      const { meals: mealsProgress } = inProgressRecipes;
      return mealsProgress[id] && mealsProgress[id].find((ingr) => ingr === ingredient);
    }
    const { cocktails } = inProgressRecipes;
    return cocktails[id] && cocktails[id].find((ingr) => ingr === ingredient);
  };

  if (details) {
    const keyAndValueArray = Object.entries(details[0]);
    ingredients = keyAndValueArray.filter(([key, value]) => (
      key.includes('strIngredient') && (value !== null && value.length > zero)
    ));
    measures = keyAndValueArray.filter(([key, value]) => (
      key.includes('strMeasure') && (value !== null && value.length > zero)
    ));
  }

  if (inProgress) {
    return (
      <div>
        <h3>Ingredient</h3>
        <div className="div-ingredient">
          {ingredients.map(([key, value], index) => (
            <div key={ key }>
              <label
                className=""
                htmlFor={ value }
                data-testid={ `${index}-ingredient-step` }
              >
                <input
                  onChange={ (e) => handleChange(e, id, recipes) }
                  name={ value }
                  id={ value }
                  type="checkbox"
                  checked={ toogleChecked(value) }
                />
                {value}
                -
                {measures[index][1]}
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (measures.length <= two) {
    return (
      <div>
        <h3>Ingredient</h3>
        <div className="div-ingredient">
          {ingredients.map(([key, value], index) => (
            <p
              key={ key }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              { `- ${value} - 1/2 part`}
            </p>
          ))}
        </div>
      </div>
    );
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
            { value}
            -
            { measures[index][1]}
          </p>
        ))}
      </div>
    </div>
  );
}

Ingredient.propTypes = {
  recipes: PropTypes.string.isRequired,
  inProgress: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};

export default Ingredient;
