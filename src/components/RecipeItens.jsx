import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function RecipeIntens(props) {
  const { id, ingredient, measures, index, type } = props;
  const [done, setdone] = useState('');
  let inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));

  function managelocalStorage(ingr) {
    setdone(done === '' ? 'complete' : '');
    inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (type === 'meals') {
      inProgress.meals[id].push(ingr);
    }
    if (type === 'cocktails') {
      inProgress.cocktails[id].push(ingr);
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
  }

  useEffect(() => {
    if (type === 'meals' && inProgress.meals[id].includes(ingredient)) {
      setdone(done === '' ? 'complete' : '');
    }
    if (type === 'cocktails' && inProgress.cocktails[id].includes(ingredient)) {
      setdone(done === '' ? 'complete' : '');
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
        onClick={ () => managelocalStorage(ingredient) }
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
