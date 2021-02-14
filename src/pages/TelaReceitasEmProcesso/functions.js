import React from 'react';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

export const handleIngredients = (recipe) => {
  const recipeArray = Object.entries(recipe[0]);
  const ingredientsArray = recipeArray.filter(
    (element) => element[0].startsWith('strIngredient') && element[1],
  );
  return ingredientsArray;
};

export const handleRecipeDone = (history) => {
  const HoraInicial = new Date();
  const horaFinal = HoraInicial.toLocaleDateString();
  localStorage.setItem('data', horaFinal);
  history.push('/receitas-feitas');
};

export const handleMeasure = (recipe) => {
  const recipeArray = Object.entries(recipe[0]);
  const measuresArray = recipeArray.filter(
    (element) => element[0].startsWith('strMeasure') && element[1],
  );
  return measuresArray;
};

export const renderWhiteHeart = () => (
  <img data-testid="favorite-btn" alt="favorite-btn" src={ whiteHeartIcon } />
);

export const renderBlackHeart = () => (
  <img data-testid="favorite-btn" alt="favorite-btn" src={ blackHeartIcon } />
);
