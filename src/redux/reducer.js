import { combineReducers } from 'redux';

const INITIAL_STATE = {
  receitas: {
    reload: true,
  },
  categorias: [],
};

function fastFood(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'LOADRECIPES':
    return {
      ...state,
      receitas: {
        ...action.object,
        redirect: true,
        reload: true,
      },
    };
  case 'LOADRECIPES2':
    return {
      ...state,
      receitas: {
        ...action.object,
        redirect: true,
        reload: false,
      },
    };
  case 'SETRECEITAS':
    return { ...state, receitas: { ...action.value, redirect: true, reload: true } };
  case 'GETCATEGORIES':
    return { ...state, categorias: action.array };
  case 'SETFILTERRECIPES':
    return { ...state, receitas: { ...action.value, redirect: false, reload: true } };
  default:
    return state;
  }
}

const rootReducer = combineReducers({ fastFood });

export default rootReducer;
