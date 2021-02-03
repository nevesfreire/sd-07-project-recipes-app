import DetailedMealTypes from './types';
import initialState from '../initialState';

const INITIAL_STATE = initialState.detalhesDaReceitaComida;

const getDetailedMealReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case DetailedMealTypes.GET:
    return { ...state, meal: action.payload };
  case DetailedMealTypes.GETRECOMMEND:
    return { ...state, mealRecommend: action.payload };
  default:
    return state;
  }
};

export default getDetailedMealReducer;
