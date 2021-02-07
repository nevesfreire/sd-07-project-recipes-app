import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function IngredientsTable({ done, setDone, ingredients, measures }) {
  return (
    <table className="ingredient__table">
      <tbody>
        {ingredients.map((ingredient, index) => (
          <tr key={ index }>
            <td>{measures[index]}</td>
            <td>
              <label
                htmlFor={ `${index}-ingredient` }
                data-testid={ `${index}-ingredient-step` }
              >
                <input
                  type="checkbox"
                  className="ingredient__table__input"
                  id={ `${index}-ingredient` }
                  name={ `${index}-ingredient` }
                  checked={ done[index] }
                  onChange={ () => {
                    const newDone = [...done];
                    newDone[index] = !done[index];
                    setDone(newDone);
                  } }
                />
                <span className={ done[index] ? 'done' : '' }>{ingredient}</span>
              </label>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

IngredientsTable.propTypes = {
  done: PropTypes.arrayOf(PropTypes.bool).isRequired,
  setDone: PropTypes.func.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  measures: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default IngredientsTable;
