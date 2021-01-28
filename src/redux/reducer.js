import { GET_INGREDIENTS, GET_NAME, GET_FIRST_LETTER } from './actions';

const initialState = {
  recipesByIngredients: [],
  recipesByName: [],
  recipesWithLetter: [],
};

function reducer(state = initialState, action) {
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
  default:
    return state;
  }
}

export default reducer;
