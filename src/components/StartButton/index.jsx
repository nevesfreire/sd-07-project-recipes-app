import React from 'react';
import PropTypes from 'prop-types';
import { addToRecipesInProgress, isInProgress, isDone } from '../../services/localStorage';

export default function StartButton({ idMeal, idDrink, history }) {
  const startRecipe = () => {
    if (idMeal) {
      addToRecipesInProgress(idMeal, 'meals');
      history.push(`/comidas/${idMeal}/in-progress`);
    } else {
      addToRecipesInProgress(idDrink, 'cocktails');
      history.push(`/bebidas/${idDrink}/in-progress`);
    }
  };

  const continueRecipe = () => {
    if (idMeal) {
      history.push(`/comidas/${idMeal}/in-progress`);
    } else {
      history.push(`/bebidas/${idDrink}/in-progress`);
    }
  };

  return (
    <button
      style={ { visibility: isDone(idMeal, idDrink) ? 'hidden' : 'visible' } }
      type="button"
      className="start-recipe-btn"
      data-testid="start-recipe-btn"
      onClick={ () => {
        if (isInProgress(idMeal, idDrink)) {
          continueRecipe();
        } else {
          startRecipe();
        }
      } }
    >
      { isInProgress(idMeal, idDrink) ? 'Continuar Receita' : 'Iniciar Receita' }
    </button>
  );
}

StartButton.propTypes = {
  idMeal: PropTypes.string.isRequired,
  idDrink: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
