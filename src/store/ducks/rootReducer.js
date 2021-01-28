import { combineReducers } from 'redux';

import auth from './auth';
import recipes from './recipes';

const rootReducer = combineReducers({
  auth,
  recipes,
});

export default rootReducer;
