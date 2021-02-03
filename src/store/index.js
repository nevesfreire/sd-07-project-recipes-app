import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  loginReducer,
  foodRecipesReducer,
  drinkRecipesReducer,
  areaReducer,
} from '../redux/reducer';

const rootReducer = combineReducers({
  loginReducer,
  foodRecipesReducer,
  drinkRecipesReducer,
  areaReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);
export default store;
