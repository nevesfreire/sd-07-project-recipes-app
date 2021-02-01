import React from 'react';
import PropTypes from 'prop-types';

export default function TodoList({ ingredients, setisEnded }) {
  console.log(ingredients);
  const checkStatus = ingredients.map(() => false);
  console.log(checkStatus);

  const isDone = (e) => {
    checkStatus[e.target.id] = !checkStatus[e.target.id];
    console.log(checkStatus);
    const a = checkStatus.filter((ingredient) => !ingredient);
    const ZERO = 0;
    if (a.length === ZERO) {
      return setisEnded(true);
    }
    return setisEnded(false);
  };

  return (
    <div>
      <form onChange={ isDone }>
        {ingredients.map((ing, index) => (
          <div key={ index } data-testid={ `${index}-ingredient-step` }>
            <input id={ index } type="checkbox" />
            <label htmlFor={ index }>{ing[1]}</label>
          </div>
        ))}
      </form>
    </div>
  );
}

TodoList.propTypes = {
  ingredients: PropTypes.string.isRequired,
  setisEnded: PropTypes.func.isRequired,
};
