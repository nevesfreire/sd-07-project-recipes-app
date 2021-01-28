import { combineReducers } from 'redux';
import userReducer from './login';
import receitasDeBebidas from './receitasDeBebidas';
import receitasDeComidas from './receitasDeComidas';

export default combineReducers({
  receitasDeBebidas,
  receitasDeComidas,
  userReducer,
});
