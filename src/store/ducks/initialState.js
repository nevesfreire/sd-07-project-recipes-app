const INITIAL_STATE = {
  auth: {
    user: {
      email: '',
    },
  },
  recipe: {
    data: {},
    isFetching: false,
  },
  areas: {
    data: [],
    isFetching: false,
  },
  categories: {
    data: [],
    isFetching: false,
  },
  ingredients: {
    data: [],
    isFetching: false,
  },
  recomendations: {
    data: [],
    isFetching: false,
  },
  recipes: {
    data: [],
    isFetching: false,
    filterOrigin: '', // home, searchbar, explore, doneAndFav
    filter: {
      type: '', // name, category, ingredient, firstLetter, area, random, type
      term: '', // term of search or filter
    },
  },
};

export default INITIAL_STATE;
