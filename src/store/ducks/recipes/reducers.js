import initialState from '../initialState';
import recipesTypes from './types';

const INITIAL_STATE = initialState.recipes;

const recipes = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case recipesTypes.REQUEST:
    return {
      ...state,
      isFetching: true,
    };

  case recipesTypes.GET_RECIPES:
    return {
      ...state,
      isFetching: false,
      data: [...action.payload],
    };

  case recipesTypes.FAILED_REQUEST:
    return {
      ...state,
      isFetching: false,
      data: [],
    };

  case recipesTypes.SET_FILTER:
    return {
      ...state,
      filterOrigin: action.payload.origin,
      filter: { type: action.payload.type, term: action.payload.term },
    };
    /*
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

  case recipesTypes.DONE_RECIPE:
    return {
      ...state,
      doneRecipes: [...state.doneRecipes, action.payload],
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
  } */
  default:
    return state;
  }
};

export default recipes;
