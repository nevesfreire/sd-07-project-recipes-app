import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import FoodAppContext from '../context/FoodAppContext';

function Instructions({ recipes }) {
  const { detailRecipe } = useContext(FoodAppContext);
  const { meals } = detailRecipe;
  const { drinks } = detailRecipe;

  if (recipes === 'comidas') {
    return (
      <div className="instruction-detail">
        <h3>Instructions</h3>
        <div className="div-instructions">
          {meals && meals.map(({ idMeal, strInstructions }) => (
            <p
              key={ idMeal }
              data-testid="instructions"
            >
              { strInstructions }
            </p>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="instruction-detail">
      <h3>Instructions</h3>
      <div className="div-instructions">
        {drinks && drinks.map(({ idDrink, strInstructions }) => (
          <p
            key={ idDrink }
            data-testid="instructions"
          >
            { strInstructions }
          </p>
        ))}
      </div>
    </div>
  );
}

Instructions.propTypes = {
  recipes: PropTypes.string.isRequired,
};

export default Instructions;
