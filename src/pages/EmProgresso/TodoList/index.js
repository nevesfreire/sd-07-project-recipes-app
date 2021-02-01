import React from 'react';

export default function TodoList({ ingredients, setisEnded }) {
  console.log(ingredients);
  const checkStatus = ingredients.map(() => false);
  console.log(checkStatus);

  const isDone = (e) => {
    checkStatus[e.target.id] = !checkStatus[e.target.id];
    console.log(checkStatus);
    const a = checkStatus.filter((ingredient) => !ingredient);
    if (a.length === 0) {
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
