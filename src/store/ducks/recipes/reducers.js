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
  case recipesTypes.GET_RECOMENDATIONS:
  {
    // put only 6 recipes recomendations
    const START_INDEX = 0;
    const END_INDEX = 6;
    return {
      ...state,
      isFetching: false,
      recomendations: [...action.payload.slice(START_INDEX, END_INDEX)],
      error: '',
    };
  }
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

  case recipesTypes.UPDATE_FROM_LS:
    return {
      ...state,
      ...action.payload,
    };
  case recipesTypes.CHECK_INGREDIENT:
  {
    if (action.payload.checked) {
      if (Object.prototype.hasOwnProperty
        .call(state.inProgressRecipes[action.payload.recipeType],
          action.payload.recipeId)) {
        return {
          ...state,
          inProgressRecipes: {
            ...state.inProgressRecipes,
            [action.payload.recipeType]: {
              ...state.inProgressRecipes[action.payload.recipeType],
              [action.payload.recipeId]: [
                ...state
                  .inProgressRecipes[action.payload.recipeType][action.payload.recipeId],
                action.payload.ingredient,
              ],
            },
          },
        };
      }
      return {
        ...state,
        inProgressRecipes: {
          ...state.inProgressRecipes,
          [action.payload.recipeType]: {
            ...state.inProgressRecipes[action.payload.recipeType],
            [action.payload.recipeId]: [
              action.payload.ingredient,
            ],
          },
        },
      };
    }
    return {
      ...state,
      inProgressRecipes: {
        ...state.inProgressRecipes,
        [action.payload.recipeType]: {
          ...state.inProgressRecipes[action.payload.recipeType],
          [action.payload.recipeId]:
              state.inProgressRecipes[action.payload.recipeType][action.payload.recipeId]
                .filter((ingredient) => ingredient !== action.payload.ingredient),
        },
      },
    };
  }
  default:
    return state;
  }
};

export default recipes;
