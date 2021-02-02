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
    detailsRecipe: {
      id: 0,
    },
    isFetching: false,
    data: [],
    error: '',
    categories: [],
    filterByCategory: '',
  },
};

export default INITIAL_STATE;
