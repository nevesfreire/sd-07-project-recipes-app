import { combineReducers } from 'redux';
import meals from './meals';
import cocktails from './cocktails';
import login from './login';

const rootReducer = combineReducers({
  login, meals, cocktails,
});

export default rootReducer;
