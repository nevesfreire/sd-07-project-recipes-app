// Seguir os exemplos dos arquivos da pasta login.
import AuthTypes from './types';
import initialState from '../initialState';

const INITIAL_STATE_MEALS = initialState.receitasDeComidas;

const recipesMealsReducer = (state = INITIAL_STATE_MEALS, action) => {
  switch (action.type) {
  // Cada 'case' traz o tipo da action, conforme definido e o seu retorno.
  case AuthTypes.MEALS:
    return { ...state, meals: action.payload };
  default:
    return state;
  }
};

export default recipesMealsReducer;
