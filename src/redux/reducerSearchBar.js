<<<<<<< HEAD
import { SHOW_HIDE_SEARCHBAR } from './actionsSearchBar';

const INITIAL_STATE = {
  toggle: false,
=======
import {
  SHOW_HIDE_SEARCHBAR,
  SHOW_HIDE_CARD_FOOD,
  SHOW_HIDE_CARD_DRINK } from './actionsSearchBar';

const INITIAL_STATE = {
  toggle: false,
  toggleFood: false,
  toggleDrink: false,
>>>>>>> main-group-1
};

function reducerSearchBar(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SHOW_HIDE_SEARCHBAR:
    return {
      ...state,
      toggle: !state.toggle,
    };
<<<<<<< HEAD
=======
  case SHOW_HIDE_CARD_FOOD:
    return { toggleFood: action.toggleFood };
  case SHOW_HIDE_CARD_DRINK:
    return { toggleDrink: action.toggleDrink };
>>>>>>> main-group-1
  default:
    return state;
  }
}

export default reducerSearchBar;
