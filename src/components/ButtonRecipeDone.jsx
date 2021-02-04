import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import FoodAppContext from '../context/FoodAppContext';
import useInProgressRecipe from '../hooks/useInProgressRecipe';

function ButtonRecipeDone({ recipes, textBtn, dataTestId }) {
  const { detailRecipe } = useContext(FoodAppContext);
  const [, /* handleChange */,
    /* inProgressRecipes */
    handleClick,
  ] = useInProgressRecipe();
  return (
    <div className="div-button-details">
      <button
        data-testid={ dataTestId }
        type="button"
        onClick={ () => handleClick(detailRecipe, recipes) }
      >
        {textBtn}
      </button>
    </div>
  );
}

ButtonRecipeDone.propTypes = {
  recipes: PropTypes.string.isRequired,
  textBtn: PropTypes.string.isRequired,
  dataTestId: PropTypes.string.isRequired,
};

export default ButtonRecipeDone;
