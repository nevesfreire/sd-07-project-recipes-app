import React from 'react';

function IngredientsTable({ done, setDone, ingredients, measures }) {
  return (
    <table>
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
    </table>
  );
}

export default IngredientsTable;
