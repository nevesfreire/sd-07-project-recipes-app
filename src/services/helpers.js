import React from 'react';

export const fetchAPI = async (url) => {
  const api = await fetch(url);
  const data = await api.json();
  return data;
};

export const handleIngredients = (recipe, initial, middle, end) => {
  const ingredients = Object.values(recipe).slice(initial, middle);
  const measures = Object.values(recipe).slice(middle, end);
  return ingredients
    .filter((recipes) => recipes !== null && recipes !== '')
    .map((ingredient, index) => (
      <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
        { `${ingredient} - ${measures[index]}` }
      </li>
    ));
};

export const SIX = 6;
export const NINE = 9;
export const TWELVE = 12;
export const TWENTY_NINE = 29;
export const FOURTY_NINE = 49;
export const THIRTY_SIX = 36;
export const TWENTY_ONE = 21;
export const FIFTY_ONE = 51;
