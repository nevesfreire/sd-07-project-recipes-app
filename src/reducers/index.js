import { combineReducers } from 'redux';
import mealsReducer from './mealsReducer';
import cocktailsReducer from './cocktailReducer';
import loginReducer from './login';

const rootReducer = combineReducers({
  loginReducer, mealsReducer, cocktailsReducer,
});

export default rootReducer;
