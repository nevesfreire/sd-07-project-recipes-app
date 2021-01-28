import { GET_INGREDIENTS } from './actions';

const initialState = {
  recipesByIngredients: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
  case GET_INGREDIENTS:
    return {
      ...state, recipesByIngredients: action.recipesByIngredients,
    };
  default:
    return state;
  }
}

export default reducer;
