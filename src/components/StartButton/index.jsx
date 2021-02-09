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
    const progressRecipes = localStorage.getItem('doneRecipes');

    if (idMeal) {
      console.log('alou');
      return JSON.parse(progressRecipes).some((recipe) => recipe.idMeal);
    }
    if (idDrink) {
      return JSON.parse(progressRecipes).some((recipe) => recipe.idMeal);
    }
  };

  const renderContinue = () => {
    if (isInProgress()) {
      return (
        <button
          type="button"
          className="start-recipe-btn"
          data-testid="start-recipe-btn"
          onClick={ continueRecipe }
        >
          Continuar Receita
        </button>
      );
    }
  };

  const renderStart = () => {
    if (!isInProgress()) {
      return (
        <button
          style={ { visibility: isDone() ? 'hidden' : 'visible' } }
          type="button"
          className="start-recipe-btn"
          data-testid="start-recipe-btn"
          onClick={ startRecipe }
        >
          Iniciar Receita
        </button>
      );
    }
  };

  return (
    <div>
      {renderContinue()}
      {renderStart()}
    </div>
  );
}

StartButton.propTypes = {
  idMeal: PropTypes.string.isRequired,
  idDrink: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
