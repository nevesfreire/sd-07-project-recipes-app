import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function managelocalStorage(param) {
  const { ingr, done, setdone, type, id } = param;
  setdone(done === '' ? 'complete' : '');
  const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (inProgress) {
    if (type === 'meals') {
      if (done !== 'complete') {
        inProgress.meals[id].push(ingr);
      } else {
        console.log('else', done);
        inProgress.meals[id] = inProgress.meals[id]
          .filter((ingredient) => ingredient !== ingr);
      }
    }
    if (type === 'cocktails') {
      if (done !== 'complete') {
        inProgress.cocktails[id].push(ingr);
      } else {
        console.log('else', done);
        inProgress.meals[id] = inProgress.cocktails[id]
          .filter((ingredient) => ingredient !== ingr);
      }
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
  }
}
function RecipeIntens(props) {
  const { id, ingredient, measures, index, type } = props;
  const [done, setdone] = useState('');
  const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));

  useEffect(() => {
    if (inProgress) {
      if (type === 'meals' && inProgress.meals[id].includes(ingredient)) {
        setdone(done === '' ? 'complete' : '');
      }
      if (type === 'cocktails' && inProgress.cocktails[id].includes(ingredient)) {
        setdone(done === '' ? 'complete' : '');
      }
    }
  }, []);

  return (

    <li
      key={ index }
      data-testid={ `${index}-ingredient-step` }
      className={ done }
    >
      {/* <label for="ingredients"> Ingredientes e medidas</label> */}
      <input
        type="checkbox"
        id="ingredients"
        name="ingredients"
        value={ ingredient }
        checked={ done === 'complete' }
        onChange={ () => managelocalStorage(ingredient, done, setdone, type, id) }
      />
      { `${ingredient} - ${measures[index]}` }

    </li>
  );
}

RecipeIntens.propTypes = {
  id: PropTypes.string.isRequired,
  ingredient: PropTypes.string.isRequired,
  measures: PropTypes.arrayOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default RecipeIntens;
