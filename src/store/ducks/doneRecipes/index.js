import doneRecipesTypes from './type';
import initialState from '../initialState';

const INITIAL_STATE_DONE_RECIPES = initialState.doneRecipes;
const doneRecipesReducer = (state = INITIAL_STATE_DONE_RECIPES, action) => {
  switch (action.type) {
  case doneRecipesTypes.DONERECIPE:
    return { ...state, recipes: [...state.recipes, action.payload] };
  default:
    return state;
  }
};

export default doneRecipesReducer;
