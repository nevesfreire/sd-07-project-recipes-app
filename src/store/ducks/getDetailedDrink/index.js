import DetailedDrinkTypes from './types';
import initialState from '../initialState';

const INITIAL_STATE = initialState.detalhesDaReceitaBebida;

const getDetailedDrinkReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case DetailedDrinkTypes.GET:
    return { ...state, drink: action.payload };
  default:
    return state;
  }
};

export default getDetailedDrinkReducer;
