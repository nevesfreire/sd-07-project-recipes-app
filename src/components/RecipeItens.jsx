import React, { useState } from 'react';
import PropTypes from 'prop-types';

function RecipeIntens(props) {
  const { id, ingredient, measures, index, type } = props;
  const [done, setdone] = useState('');
  let inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  console.log(inProgress);
  if (type === 'meals' && !inProgress.meals[id]) {
    inProgress.meals[id] = [];
  } else if (type === 'cocktails' && !inProgress.cocktails[id]) {
    inProgress.cocktails[id] = [];
  }

  function managelocalStorage(ingredient1, idReceita) {
    setdone(done === '' ? 'complete' : '');
    inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    console.log(inProgress);
    // if (isMeal && !inProgress.meals) {
    //   localStorage.setItem('inProgressRecipes',
    //     JSON.stringify({
    //       ...inProgress,
    //       meals: {
    //         ...inProgress.meals,
    //         [idReceita]: [],
    //       },
    //     }));
    // } else if (!isMeal && !inProgress.cocktails) {
    //   localStorage.setItem('inProgressRecipes',
    //     JSON.stringify({
    //       ...inProgress,
    //       cocktails: {
    //         ...inProgress.cocktails,
    //         [idReceita]: [],
    //       },
    //     }));
    // }

    if (type === 'meals') {
      localStorage.setItem('inProgressRecipes',
        JSON.stringify({
          ...inProgress,
          meals: {
            ...inProgress.meals,
            [idReceita]: [...inProgress.meals[idReceita], ingredient1],
          },
        }));
    } else if (type === 'cocktails') {
      localStorage.setItem('inProgressRecipes',
        JSON.stringify({
          ...inProgress,
          cocktails: {
            ...inProgress.cocktails,
            [idReceita]: [...inProgress.cocktails[idReceita], ingredient1],
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
  type: PropTypes.bool.isRequired,
};

export default RecipeIntens;
