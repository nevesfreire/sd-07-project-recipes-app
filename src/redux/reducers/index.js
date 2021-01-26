import { combineReducers } from 'redux';
import drinkReducer from './drinkReducer';
import foodReducer from './foodReducer';

const rootReducer = combineReducers({ drinkReducer, foodReducer });

export default rootReducer;
