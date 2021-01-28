const COCKTAIL_INITIAL_STATE = { cocktails: [], isFetching: false };

function cocktailsDrinks(state = COCKTAIL_INITIAL_STATE, action) {
  switch (action.type) {
  case 'REQUEST_COCKTAIL':
    return { ...state, isFetching: true };
  case 'ADD_COCKTAIL':
    return { cocktails: action.cocktails.drinks, isFetching: false };
  default:
    return state;
  }
}

export default cocktailsDrinks;
