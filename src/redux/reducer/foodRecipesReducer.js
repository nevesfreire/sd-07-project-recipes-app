import {
  REQUEST_FOOD_RECIPES,
  LIST_FOOD_RECIPES,
  REQUEST_FOOD_FAILED,
  UPDATE_FOOD_IS_FETCHING,
  RESQUEST_ALL_CATEGORIES_MEALS,
  FILTERED_FOOD_BY_CATEGORY,
  REQUEST_INGREDIENTS_FOODS,
  REQUEST_AREA,
  REQUEST_AREA_FAILED,
  SELECT_AREA,
} from '../actions';

const INITIAL_STATE = {
  isFetching: true,
  meals: [],
  categories: [],
  currentCategoryFood: 'all',
  error: false,
  ingredients: '',
};

const foodRecipesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RESQUEST_ALL_CATEGORIES_MEALS:
    return {
      ...state,
      categories: action.categories,
    };
  case FILTERED_FOOD_BY_CATEGORY:
    return {
      ...state,
      meals: (!action.foodFilteredByCategory) ? [] : action.foodFilteredByCategory,
      currentCategoryFood: action.category.strCategory,
      isFetching: false,
    };
  case REQUEST_FOOD_RECIPES:
    return { ...state, isFetching: true };
  case LIST_FOOD_RECIPES:
    return {
      ...state,
      meals: (!action.payload.meals) ? [] : action.payload.meals,
      isFetching: false,
      currentCategoryFood: 'all',
    };
  case REQUEST_FOOD_FAILED:
    return { ...state, error: true, isFetching: false };
  case UPDATE_FOOD_IS_FETCHING:
    return { ...state, isFetching: true };
  case REQUEST_AREA:
    return {
      ...state,
      isFetching: true,
    };
  case REQUEST_AREA_FAILED:
    return { ...state, error: true };
  case SELECT_AREA:
    return {
      ...state,
      meals: action.meals,
      isFetching: false,
    };
  default:
    return state;
  case REQUEST_INGREDIENTS_FOODS:
    return { ...state, currentCategoryFood: action.ingredients };
  }
};

export default foodRecipesReducer;
