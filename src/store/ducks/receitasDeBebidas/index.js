// Seguir os exemplos dos arquivos da pasta login.
import DrinksTypes from './types';
import initialState from '../initialState';

const INITIAL_STATE_DRINKS = initialState.receitasDeBebidas;

const recipesDrinksReducer = (state = INITIAL_STATE_DRINKS, action) => {
  switch (action.type) {
  // Cada 'case' traz o tipo da action, conforme definido e o seu retorno.
  case DrinksTypes.DRINKS:
    return { ...state, drinks: action.payload };
  default:
    return state;
  }
};

export default recipesDrinksReducer;
