import {
  SHOW_HIDE_SEARCHBAR,
  SHOW_HIDE_CARD_FOOD,
  SHOW_HIDE_CARD_DRINK } from './actionsSearchBar';

const INITIAL_STATE = {
  toggle: false,
  toggleFood: false,
  toggleDrink: false,
};

function reducerSearchBar(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SHOW_HIDE_SEARCHBAR:
    return {
      ...state,
      toggle: !state.toggle,
    };
  case SHOW_HIDE_CARD_FOOD:
    return { toggleFood: action.toggleFood };
  case SHOW_HIDE_CARD_DRINK:
    return { toggleDrink: action.toggleDrink };
  default:
    return state;
  }
}

export default reducerSearchBar;
