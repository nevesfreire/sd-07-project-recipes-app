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
    isFetching: false,
    data: [],
    error: '',
    categories: [],
    filter: {
      type: '', // name, category, ingredient, firstLetter, area, random
      term: '', // term of search or filter
    },
  },
};

export default INITIAL_STATE;
