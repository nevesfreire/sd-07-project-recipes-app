import {
  REQUEST_STARTED,
  MEALS_REQUEST,
  COCKTAILS_REQUEST,
  REQUEST_FAIL,
  MEAL_CATEGORIES_REQUEST,
  DRINK_CATEGORIES_REQUEST,
} from '../actions/mainpage';

const INITIAL_STATE = {
  meals: [],
  drinks: [],
  isLoading: false,
  mealCategories: [],
  drinkCategories: [],
};

function mainpage(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_STARTED:
    return { ...state, isLoading: true };
  case MEALS_REQUEST:
    return { ...state, meals: action.meals, isLoading: false };
  case COCKTAILS_REQUEST:
    return { ...state, drinks: action.drinks, isLoading: false };
  case MEAL_CATEGORIES_REQUEST:
    return { ...state, mealCategories: action.categories, isLoading: false };
  case DRINK_CATEGORIES_REQUEST:
    return { ...state, drinkCategories: action.categories, isLoading: false };
  case REQUEST_FAIL:
    return { ...state, meals: action.meals, isLoading: false };
  default:
    return state;
  }
}

export default mainpage;
