import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { getKeys } from '../Services';
import { useRecipeInProgress } from '../hooks';
import './components.css';

export default function CheckListIngredients({
  ingreObj, recipeId, setComplet, drink,
}) {
  const measures = getKeys(ingreObj, 'strMeasure');
  const ingredients = getKeys(ingreObj, 'strIngredient');

  const [items, setItem] = useRecipeInProgress(recipeId, drink);

  const allCheck = useCallback(() => {
    const ingredientsNumber = +ingredients.length;
    const itemsNumber = +items.length;
    const zero = 0;
    const result = ingredientsNumber === itemsNumber && ingredientsNumber !== zero;
    setComplet(result);
  }, [setComplet, items, ingredients]);

  useEffect(allCheck, [allCheck]);

  const checkItem = ({ target: { id } }) => {
    setItem(id);
  };

  return (
    <div>
      {
        ingredients.map((key, index) => {
          const [, ingredient] = key || ['', ''];
          const [, measure] = measures[index] || ['', ''];
          const checked = items && items.includes(index.toString());

          return (
            <div
              key={ index }
              onChange={ checkItem }
              data-testid={ `${index}-ingredient-step` }
            >
              <input
                defaultChecked={ checked }
                type="checkbox"
                id={ index }
                autoComplete="off"
              />

              <label
                className="checked"
                htmlFor={ index }
              >
                { `${ingredient} - ${measure}` }
              </label>

            </div>
          );
        })
      }
    </div>
  );
}

CheckListIngredients.defaultProps = {
  drink: true,
};

CheckListIngredients.propTypes = {
  ingreObj: PropTypes.shape().isRequired,
  recipeId: PropTypes.string.isRequired,
  drink: PropTypes.bool,
  setComplet: PropTypes.func.isRequired,
};
