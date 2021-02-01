import {
  GET_INGREDIENTS_DRINK,
  GET_NAME_DRINK,
  GET_FIRST_LETTER_DRINK,
  GET_BY_ID_DRINK,
  GET_RANDOM_DRINK } from './actionsBebidas';

const initialState = {
  recipesByIngredientsBebida: [],
  recipesByNameBebida: [],
  recipesWithLetterBebida: [],
  recipeByIDBebida: [],
  recipesByRadomBebida: [],
};

function reducerBebidas(state = initialState, action) {
  switch (action.type) {
  case GET_INGREDIENTS_DRINK:
    return {
      ...state,
      recipesByIngredientsBebida: action.recipesByIngredientsBebida,
    };
  case GET_NAME_DRINK:
    return {
      ...state,
      recipesByNameBebida: action.recipesByNameBebida,
    };
  case GET_FIRST_LETTER_DRINK:
    return {
      ...state,
      recipesWithLetterBebida: action.recipesWithLetterBebida,
    };
  case GET_BY_ID_DRINK:
    return {
      ...state,
      recipeByIdBebida: action.recipeByIdBebida,
    };
  case GET_RANDOM_DRINK:
    return {
      ...state,
      recipesByRadomBebida: action.recipesByRadomDrink,
    };
  default:
    return state;
  }
}

export default reducerBebidas;
