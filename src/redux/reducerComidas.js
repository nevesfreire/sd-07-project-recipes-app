import {
  GET_INGREDIENTS,
  GET_NAME,
  GET_FIRST_LETTER,
  GET_BY_ID,
  GET_RANDOM_FOOD } from './actionsComidas';

const initialState = {
  recipesByIngredients: [],
  recipesByName: [],
  recipesWithLetter: [],
  recipeById: [],
  recipesByRadomFood: [],
};

function reducerComidas(state = initialState, action) {
  switch (action.type) {
  case GET_INGREDIENTS:
    return {
      ...state,
      recipesByIngredients: action.recipesByIngredients,
    };
  case GET_NAME:
    return {
      ...state,
      recipesByName: action.recipesByName,
    };
  case GET_FIRST_LETTER:
    return {
      ...state,
      recipesWithLetter: action.recipesWithLetter,
    };
  case GET_BY_ID:
    return {
      ...state,
      recipeById: action.recipeById,
    };
  case GET_RANDOM_FOOD:
    return {
      ...state,
      recipesByRadomFood: action.recipesByRadomFood,
    };
  default:
    return state;
  }
}

export default reducerComidas;
