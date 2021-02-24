import React, { useState } from 'react';
import PropTypes from 'prop-types';

function RecipeIntens(props) {
  const { ingredient, measures, index, isMeal } = props;
  const [done, setdone] = useState('');
  const inProgress = localStorage.getItem('inProgressRecipes');
  console.log(inProgress);
  function managelocalStorage(ingredient1) {
    setdone(done === '' ? 'complete' : '');
    if (isMeal) {
      localStorage.setItem('inProgressRecipes',
        JSON.stringify(inProgress), JSON.stringify(ingredient1));
    } else {
      localStorage.setItem();
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
        onClick={ () => managelocalStorage(ingredient) }
      />
      { `${ingredient} - ${measures[index]}` }

    </li>
  );
}

RecipeIntens.propTypes = {
  ingredient: PropTypes.string.isRequired,
  measures: PropTypes.arrayOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
  isMeal: PropTypes.bool.isRequired,
};

export default RecipeIntens;
