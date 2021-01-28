/*
  REFERENCE:
    https://egghead.io/lessons/javascript-redux-persisting-the-state-to-the-local-storage
*/

const LS_KEYS = {
  USER_KEY: 'user',
  MEALS_TOKEN_KEY: 'mealsToken',
  COCKTAILS_TOKEN_KEY: 'cocktailsToken',
  DONE_RECIPES_KEY: 'doneRecipes',
  FAVORITE_RECIPES_KEY: 'favoriteRecipes',
  IN_PROGRESS_RECIPES_KEY: 'inProgressRecipes',
};

export const loadState = (state) => {
  try {
    Object.keys(LS_KEYS).forEach((KEY) => {
      const serializedStateKey = localStorage.getItem(KEY);
      const resultStateKey = JSON.parse(serializedStateKey);
      switch (KEY) {
      case 'USER_KEY':
        state.auth.user.email = resultStateKey.email;
        break;
      case 'MEALS_TOKEN_KEY':
        state.recipes.mealsToken = resultStateKey || 1;
        break;
      case 'COCKTAILS_TOKEN_KEY':
        state.recipes.cocktailsToken = resultStateKey || 1;
        break;
      case 'DONE_RECIPES_KEY':
        state.recipes.doneRecipes = resultStateKey || [];
        break;
      case 'FAVORITE_RECIPES_KEY':
        state.recipes.favoriteRecipes = resultStateKey || [];
        break;
      case 'IN_PROGRESS_RECIPES_KEY':
        state.inProgressRecipes.cocktails = resultStateKey.cocktails || {};
        state.inProgressRecipes.meals = resultStateKey.meals || {};
        break;
      default:
        console.log('ERROR LOAD LS: KEY INVÁLIDA > ', KEY);
      }
    });
    return state;
  } catch (error) {
    console.log(error);
    return state;
  }
};

export const saveState = (state) => {
  try {
    localStorage.setItem(LS_KEYS.USER_KEY,
      JSON.stringify(state.auth.user));
    localStorage.setItem(LS_KEYS.MEALS_TOKEN_KEY,
      JSON.stringify(state.recipes.mealsToken));
    localStorage.setItem(LS_KEYS.COCKTAILS_TOKEN_KEY,
      JSON.stringify(state.recipes.cocktailsToken));
    localStorage.setItem(LS_KEYS.DONE_RECIPES_KEY,
      JSON.stringify(state.recipes.doneRecipes));
    localStorage.setItem(LS_KEYS.FAVORITE_RECIPES_KEY,
      JSON.stringify(state.recipes.favoriteRecipes));
    localStorage.setItem(LS_KEYS.IN_PROGRESS_RECIPES_KEY,
      JSON.stringify(state.recipes.inProgressRecipes));
  } catch (error) {
    // LOG WRITE ERRORS
    console.log(error);
  }
};
