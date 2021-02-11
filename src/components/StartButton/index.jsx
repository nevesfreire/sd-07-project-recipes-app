import React from 'react';
import PropTypes from 'prop-types';
import { addToRecipesInProgress } from '../../services/localStorage';

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

  const isInProgress = () => {
    const progressRecipes = localStorage.getItem('inProgressRecipes');

    if (idMeal) {
      return JSON.parse(progressRecipes).meals[idMeal];
    }
    if (idDrink) {
      return JSON.parse(progressRecipes).cocktails[idDrink];
    }
  };

  const isDone = () => {
    const doneRecipes = localStorage.getItem('doneRecipes');

    if (idMeal) {
      return JSON.parse(doneRecipes).some((recipe) => recipe.id === idMeal);
    }
    if (idDrink) {
      return JSON.parse(doneRecipes).some((recipe) => recipe.id === idDrink);
    }
  };

  return (
    <button
      style={ { visibility: isDone() ? 'hidden' : 'visible' } }
      type="button"
      className="start-recipe-btn"
      data-testid="start-recipe-btn"
      onClick={ () => {
        if (isInProgress()) {
          continueRecipe();
        } else {
          startRecipe();
        }
      } }
    >
      { isInProgress() ? 'Continuar Receita' : 'Iniciar Receita' }
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
