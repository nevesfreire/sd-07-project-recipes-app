import React, { useContext } from 'react';
import {
  NINE,
  TWENTY_ONE,
  THIRTY_SIX,
  TWENTY_NINE,
  FOURTY_NINE,
  FIFTY_ONE,
} from '../services/helpers';
import RecipesContext from '../context/RecipesContext';
import history from '../history/history';

// const toggleCheckboxChange = (e) => {
//   const { pathname } = history.location;
//   const progress = localStorage.getItem('inProgressRecipes');
// };

const handleIngredientsInProgress = (recipe, initial, middle, end) => {
  const ingredients = Object.values(recipe).slice(initial, middle);
  const measures = Object.values(recipe).slice(middle, end);
  return ingredients
    .filter((recipes) => recipes !== null && recipes !== '')
    .map((ingredient, index) => (
      <div data-testid={ `${index}-ingredient-step` } key={ `${index}-ingredient` }>
        <input
          // onChange={toggleCheckboxChange}
          type="checkbox"
          id={ `${index}-ingredient` }
          nome="subscribe"
        />
        {' '}
        <label htmlFor={ `${index}-ingredient` } key={ index }>
          {`${ingredient} - ${measures[index]}`}
          {' '}
        </label>
      </div>
    ));
};

function CheckBoxProgress() {
  const { recipeDetailDrink, recipeDetailFood } = useContext(RecipesContext);
  const { pathname } = history.location;

  return (
    <div>
      {pathname.includes('bebidas')
        ? handleIngredientsInProgress(
          recipeDetailDrink,
          TWENTY_ONE,
          THIRTY_SIX,
          FIFTY_ONE,
        )
        : handleIngredientsInProgress(
          recipeDetailFood,
          NINE,
          TWENTY_NINE,
          FOURTY_NINE,
        )}
    </div>
  );
}

export default CheckBoxProgress;
