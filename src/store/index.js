import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { loginReducer, foodRecipesReducer, drinkRecipesReducer } from '../redux/reducer';

const rootReducer = combineReducers({
  loginReducer,
  foodRecipesReducer,
  drinkRecipesReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);
export default store;
