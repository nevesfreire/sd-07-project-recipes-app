import initialState from '../initialState';

const INITIAL_STATE = initialState.recipes;

const recipes = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  default:
    return state;
  }
};

export default recipes;
