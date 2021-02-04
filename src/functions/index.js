import React from 'react';
import copy from 'clipboard-copy';

function handleCopy(executeCopy) {
  copy(window.location.href);
  executeCopy('Link copiado!');
}

function showButton(id, history) {
  const getDoneStorage = JSON.parse(localStorage.getItem('doneRecipes'));
  const getProgressRecipeStorage = JSON.parse(
    localStorage.getItem('inProgressRecipes'),
  );
  if (!getDoneStorage.length) {
    return (
      <button
        type="button"
        data-testid="start-recipe-btn"
        onClick={ () => history.push(`/comidas/${id}/in-progress`) }
        className="finish-button-recipe"
      >
        Iniciar Receita
      </button>
    );
  }
  if (getProgressRecipeStorage) {
    return (
      <button
        type="button"
        data-testid="start-recipe-btn"
        onClick={() => history.push(`/comidas/${id}/in-progress`)}
        className="finish-button-recipe"
      >
        Continuar Receita
      </button>
    );
  }
}

export {
  handleCopy,
  showButton,
};
