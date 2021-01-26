FOOD_INITIAL_STATE = { meals: [], isFetching: false };

function foodMeals(state = FOOD_INITIAL_STATE, action) {
  switch (action.type) {
  case 'REQUEST_FOOD':
    return { ...state, isFetching: true };
  case 'ADD_FOOD':
    return { meals: action.food, isFetching: false };
  default:
    return state;
  }
}

export default foodMeals;
