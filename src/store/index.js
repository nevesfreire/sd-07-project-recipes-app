import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  loginReducer,
  // foodRecipesReducer,
  // drinkRecipesReducer,
  recipesReducer,
  areaReducer,
} from '../redux/reducer';

const rootReducer = combineReducers({
  loginReducer,
  // foodRecipesReducer,
  // drinkRecipesReducer,
  recipesReducer,
  areaReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);
export default store;
