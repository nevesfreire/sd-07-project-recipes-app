COCKTAIL_INITIAL_STATE = { cocktails: [], isFetching: false };

function cocktailsDrinks(state = COCKTAIL_INITIAL_STATE, action) {
  switch (action.type) {
  case 'REQUEST_FOOD':
    return { ...state, isFetching: true };
  case 'COCKTAIL':
    return { cocktails: action.cocktails, isFetching: false };
  default:
    return state;
  }
}

export default cocktailsDrinks;
