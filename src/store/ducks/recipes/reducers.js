import initialState from '../initialState';
import recipesTypes from './types';

const INITIAL_STATE = initialState.recipes;

const recipes = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case recipesTypes.REQUEST:
    return {
      ...state,
      isFetching: true,
      error: '',
    };
  case recipesTypes.GET_RECIPES:
    return {
      ...state,
      isFetching: false,
      data: [...action.payload],
      error: '',
    };
  case recipesTypes.GET_CATEGORIES:
  {
    // put only 5 categories and map to strings
    const START_INDEX = 0;
    const END_INDEX = 5;
    return {
      ...state,
      isFetching: false,
      categories: [...action.payload.slice(START_INDEX, END_INDEX)
        .map(({ strCategory }) => strCategory)],
      error: '',
    };
  }
  case recipesTypes.FAILED_REQUEST:
    return {
      ...state,
      isFetching: false,
      data: [],
      error: action.payload,
    };

  case recipesTypes.SET_FILTER:
    return {
      ...state,
      filter: { ...action.payload },
    };
  case recipesTypes.FAVORITE_RECIPE:
    return {
      ...state,
      favoriteRecipes: [...state.favoriteRecipes, action.payload],
    };
  case recipesTypes.UNFAVORITE_RECIPE:
    return {
      ...state,
      favoriteRecipes: [...state.favoriteRecipes]
        .filter(({ id }) => id !== action.payload),
    };
  case recipesTypes.SET_RECIPE_DETAILS:
    return {
      ...state,
      detailsRecipe: action.payload,
    };

  default:
    return state;
  }
};

export default recipes;
