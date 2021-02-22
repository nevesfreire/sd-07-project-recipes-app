import React, { useState } from 'react';
import PropTypes from 'prop-types';

function RecipeIntens(props) {
  const { ingredient, measures, index } = props;
  const [done, setdone] = useState('');
  function managelocalStorage() {
    setdone(done === '' ? 'complete' : '');
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
        value="ingredients"
        onClick={ () => managelocalStorage() }
      />
      { `${ingredient} - ${measures[index]}` }

    </li>
  );
}

RecipeIntens.propTypes = {
  ingredient: PropTypes.string.isRequired,
  measures: PropTypes.arrayOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipeIntens;
