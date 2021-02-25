import React, { useState } from 'react';
import PropTypes from 'prop-types';

function RecipeIntens(props) {
  const { id, ingredient, measures, index, isMeal } = props;
  const [done, setdone] = useState('');
  let inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  console.log(inProgress);

  function managelocalStorage(ingredient1, idReceita) {
    setdone(done === '' ? 'complete' : '');
    inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (isMeal) {
      localStorage.setItem('inProgressRecipes',
        JSON.stringify({
          ...inProgress,
          meals: {
            ...inProgress.meals,
            [idReceita]: [...inProgress.meals[idReceita], ingredient1],
          },
        }));
    } else {
      localStorage.setItem('inProgressRecipes',
        JSON.stringify({
          ...inProgress,
          drinks: {
            ...inProgress.drinks,
            [idReceita]: [...inProgress.drinks[idReceita], ingredient1],
          },
        }));
    }
  }
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
        onClick={ () => managelocalStorage(ingredient, id) }
      />
      { `${ingredient} - ${measures[index]}` }

    </li>
  );
}

RecipeIntens.propTypes = {
  id: PropTypes.number.isRequired,
  ingredient: PropTypes.string.isRequired,
  measures: PropTypes.arrayOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
  isMeal: PropTypes.bool.isRequired,
};

export default RecipeIntens;
