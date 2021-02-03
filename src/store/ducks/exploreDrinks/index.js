// Seguir os exemplos dos arquivos da pasta login.
import RandomDrinkTypes from './types';
import initialState from '../initialState';

const INITIAL_STATE_DRINKS = initialState.exploreDrinks;

const RandomDrinks = (state = INITIAL_STATE_DRINKS, action) => {
  switch (action.type) {
  // Cada 'case' traz o tipo da action, conforme definido e o seu retorno.
  case RandomDrinkTypes.DRINKS:
    return { ...state, drinks: action.payload };
  default:
    return state;
  }
};

export default RandomDrinks;
