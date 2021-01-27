const INITIAL_STATE = {
  tipo: 'comidas',
};

function fastFood(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'SETLOCAL':
    return { ...state, tipo: action.value };
  default:
    return state;
  }
}

export default fastFood;
