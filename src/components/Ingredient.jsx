import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/details.css';

import useInProgressRecipe from '../hooks/useInProgressRecipe';
import ButtonRecipeDone from './ButtonRecipeDone';
import Instructions from './Instructions';
import useProgressIngredient from '../hooks/useProgressIngredient';

function Ingredient({ recipes, inProgress, id }) {
  const [/* handleClick */, disable, setIngredientCount, inProgressRecipes,
    buttonToDisable, handleChange] = useInProgressRecipe();
  const [ingredients, measures, two] = useProgressIngredient(id, recipes);
  const ingredCount = document.querySelectorAll('.div-ingredient-count').length;

  const toogleChecked = (ingredient) => {
    if (inProgressRecipes) {
      if (recipes === 'comidas') {
        const { meals: mealsProgress } = inProgressRecipes;
        return mealsProgress[id]
          && mealsProgress[id].find((ingr) => ingr === ingredient);
      }
      const { cocktails } = inProgressRecipes;
      return cocktails[id] && cocktails[id].find((ingr) => ingr === ingredient);
    }
  };

  useEffect(() => {
    setIngredientCount(ingredCount);
    buttonToDisable(id, recipes, ingredCount);
  });

  if (inProgress) {
    if (measures.length <= two) {
      return (
        <div>
          <h3>Ingredient</h3>
          <div className="div-ingredient">
            {ingredients.map(([/* key */, value], index) => (
              <div key={ index } className="div-ingredient-count">
                <label
                  htmlFor={ value }
                  data-testid={ `${index}-ingredient-step` }
                >
                  <input
                    onChange={ (e) => handleChange(e, id, recipes, ingredCount) }
                    name={ value }
                    id={ value }
                    type="checkbox"
                    checked={ toogleChecked(value) }
                  />
                  { `- ${value} - 1/2 part`}
                </label>
              </div>
            ))}
          </div>
          <Instructions recipes={ recipes } />
          <ButtonRecipeDone
            recipes={ recipes }
            textBtn="Finalizar Receita"
            dataTestId="finish-recipe-btn"
            disable={ disable }
          />
        </div>
      );
    }
    return (
      <div>
        <h3>Ingredient</h3>
        <div className="div-ingredient">
          {ingredients.map(([/* key */, value], index) => (
            <div key={ index } className="div-ingredient-count">
              <label
                htmlFor={ value }
                data-testid={ `${index}-ingredient-step` }
              >
                <input
                  onChange={ (e) => handleChange(e, id, recipes, ingredCount) }
                  name={ value }
                  id={ value }
                  type="checkbox"
                  checked={ toogleChecked(value) }
                />
                {' '}
                <span
                  className={ toogleChecked(value) ? 'checkedIngredient' : '' }
                >
                  {value}
                  -
                  {measures[index][1]}
                </span>
              </label>
            </div>
          ))}
        </div>
        <Instructions recipes={ recipes } />
        <ButtonRecipeDone
          recipes={ recipes }
          textBtn="Finalizar Receita"
          dataTestId="finish-recipe-btn"
          disable={ disable }
        />
      </div>
    );
  }

  if (measures.length <= two) {
    return (
      <div>
        <h3>Ingredient</h3>
        <div className="div-ingredient">
          {ingredients.map(([/* key */, value], index) => (
            <p
              key={ index }
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
        {ingredients.map(([/* key */, value], index) => (
          <p
            key={ index }
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
  recipes: PropTypes.string,
  inProgress: PropTypes.bool,
  id: PropTypes.string,
};

Ingredient.defaultProps = {
  recipes: '',
  inProgress: false,
  id: '',
};

export default Ingredient;
