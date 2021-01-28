const INITIAL_STATE = {
  auth: {
    user: {
      email: '',
    },
  },
  recipes: {
    mealsToken: 1,
    cocktailsToken: 1,
    doneRecipes: [],
    favoriteRecipes: [],
    inProgressRecipes: {
      cocktails: {},
      meals: {},
    },
  },
};

export default INITIAL_STATE;
