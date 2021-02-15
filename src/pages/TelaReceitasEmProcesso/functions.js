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

export const handleRecipeDone = async (history, meal) => {
  const HoraInicial = await new Date();
  const horaFinal = HoraInicial.toLocaleDateString();
  const zero = 0;
  localStorage.setItem('checkboxesM', '');
  const currentStorage = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const tagsArray = meal.strTags.split(',');
  const currentRecipe = {
    type: 'comida',
    image: meal.strMealThumb,
    category: meal.strCategory,
    name: meal.strMeal,
    tags: tagsArray,
    id: meal.idMeal,
    area: meal.strArea,
    doneDate: horaFinal,
  };
  currentStorage.push(currentRecipe);
  if (currentStorage.length > zero) {
    localStorage.setItem(
      'doneRecipes', JSON.stringify(currentStorage),
    );
  } else localStorage.setItem('doneRecipes', JSON.stringify(currentStorage));
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
