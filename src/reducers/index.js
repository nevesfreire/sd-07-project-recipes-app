import { combineReducers } from 'redux';
import mealsReducer from './mealsReducer';
import cocktailsReducer from './cocktailReducer';

const rootReducer = combineReducers({
  mealsReducer, cocktailsReducer,
});

export default rootReducer;
