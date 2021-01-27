const INITIAL_STATE = {
  tipo: 'comidas',
  receitas: {},
};

function fastFood(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'SETLOCAL':
    return { ...state, tipo: action.value };
  case 'SETRECEITAS':
    return { ...state, receitas: action.value };
  default:
    return state;
  }
}

export default fastFood;
