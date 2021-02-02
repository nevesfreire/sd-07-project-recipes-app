import randomFoodType from './types';
import initialState from '../initialState';

const INITIAL_STATE_FOODS = initialState.exploreFoods;

const RandomFoods = (state = INITIAL_STATE_FOODS, action) => {
  switch (action.type) {
  // Cada 'case' traz o tipo da action, conforme definido e o seu retorno.
  case randomFoodType.FOODS:
    return { ...state, meals: action.payload };
  default:
    return state;
  }
};

export default RandomFoods;
