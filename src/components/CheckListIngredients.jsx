import React from 'react';
import PropTypes from 'prop-types';
import { getKeys } from '../Services';
import './components.css';

export default function CheckListIngredients({ ingreObj, checkItem, itens }) {
  const keysIngredients = getKeys(ingreObj, 'strIngredient');
  return (
    <div>
      <h4>Ingredients</h4>
      { keysIngredients.map((key, i) => {
        const measures = getKeys(ingreObj, 'strMeasure');
        const checked = itens && itens.includes(i.toString());
        return (
          <div
            key={ i }
            onChange={ ({ target }) => { checkItem(target.id); } }
          >
            {
              checked
                ? (
                  <input
                    defaultChecked
                    type="checkbox"
                    id={ i }
                    autoComplete="off"
                    data-testid={ `${i}-ingredient-step` }
                  />
                )
                : (
                  <input
                    type="checkbox"
                    className="btn-check"
                    id={ i }
                    autoComplete="off"
                    data-testid={ `${i}-ingredient-step` }
                  />
                )
            }
            <label
              className="checked"
              htmlFor={ i }
            >
              { `${key && key[1]}${measures[i] ? ` - ${measures[i][1]}` : ''}` }
            </label>
          </div>
        );
      })}
    </div>
  );
}

CheckListIngredients.propTypes = {
  ingreObj: PropTypes.shape().isRequired,
  checkItem: PropTypes.func.isRequired,
  itens: PropTypes.arrayOf(PropTypes.string).isRequired,
};
