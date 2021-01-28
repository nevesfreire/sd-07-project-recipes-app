const INITIAL_STATE = {
  tipo: 'comidas',
  receitas: {},
  categorias: [],
};

function fastFood(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'LOADRECIPES':
    return {
      ...state,
      tipo: action.value,
      receitas: {
        ...action.object,
        redirect: true,
      },
    };
  case 'SETRECEITAS':
    return { ...state, receitas: { ...action.value, redirect: true } };
  case 'GETCATEGORIES':
    return { ...state, categorias: action.array };
  case 'SETFILTERRECIPES':
    return { ...state, receitas: { ...action.value, redirect: false } };
  default:
    return state;
  }
}

export default fastFood;
