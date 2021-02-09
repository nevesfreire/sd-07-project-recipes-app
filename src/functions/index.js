import React from 'react';
import copy from 'clipboard-copy';

function handleCopy(executeCopy) {
  const url = window.location.href;
  const finalUrl = url.replace('/in-progress', '');
  copy(finalUrl);
  executeCopy('Link copiado!');
}

function handleClick(type, history, id) {
  if (type === 'meals') {
    history.push(`/comidas/${id}/in-progress`);
  } else {
    history.push(`/bebidas/${id}/in-progress`);
  }
}

function showButton(id, type, history) {
  const getDoneStorage = JSON.parse(localStorage.getItem('doneRecipes'));

  const getProgressRecipeStorage = JSON.parse(
    localStorage.getItem('inProgressRecipes'),
  );

  if (getProgressRecipeStorage) {
    const checkoutProgressRecipe = Object.keys(getProgressRecipeStorage[type])
      .some((idRecipe) => idRecipe === id);

    if (!getDoneStorage && getProgressRecipeStorage && checkoutProgressRecipe) {
      return (
        <button
          type="button"
          data-testid="start-recipe-btn"
          onClick={ () => handleClick(type, history, id) }
          className="finish-button-recipe"
        >
          Continuar Receita
        </button>
      );
    }
  } else if (!getDoneStorage || !getDoneStorage.length) {
    return (
      <button
        type="button"
        data-testid="start-recipe-btn"
        onClick={ () => handleClick(type, history, id) }
        className="finish-button-recipe"
      >
        Iniciar Receita
      </button>
    );
  }
}

export {
  handleCopy,
  showButton,
};
