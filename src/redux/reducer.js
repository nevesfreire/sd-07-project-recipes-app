const INITIAL_STATE = {
  tipo: 'comidas',
  receitas: {},
};

function fastFood(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'LOADRECIPES':
    return { ...state, tipo: action.value, receitas: action.object };
  case 'SETRECEITAS':
    return { ...state, receitas: action.value };
  default:
    return state;
  }
}

export default fastFood;
