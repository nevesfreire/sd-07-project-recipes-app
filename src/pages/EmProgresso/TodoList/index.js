import React, { useState } from 'react';
import PropTypes, { arrayOf } from 'prop-types';

export default function TodoList({ id, route, ingredients, setisEnded }) {
  const progressStatus = JSON.parse(localStorage.getItem('inProgressRecipes'));
  let key = 'meals';
  if (route === 'bebidas') key = 'cocktails';
  const checkStatus = ingredients.map(() => false);

  const [checks, setChecks] = useState(checkStatus);

  if (progressStatus && progressStatus[key][id]) {
    const newChecks = progressStatus[key][id];
    console.log(newChecks)
    // setChecks(newChecks);
  }

  // console.log('ingr:', ingredients);

  const updateStorage = () => {
    const progressObj = {
      meals: {},
      cocktails: {},
    };

    progressObj[key][id] = checks;
    console.log(progressObj);
    localStorage.setItem('inProgressRecipes', JSON.stringify(progressObj));
  };
  const isDone = (e) => {
    checkStatus[e.target.id] = !checkStatus[e.target.id];
    setChecks(checkStatus);
    updateStorage();
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
            <input id={ index } type="checkbox" checked={ checks[index] } />
            <label htmlFor={ index }>{ing[1]}</label>
          </div>
        ))}
      </form>
    </div>
  );
}

TodoList.propTypes = {
  ingredients: arrayOf(PropTypes.string).isRequired,
  setisEnded: PropTypes.func.isRequired,
};
