import types from '../actions/types';

const FAVORITES_INITIAL_STATE = {
  userFavorites: [],
};

const favorites = (state = FAVORITES_INITIAL_STATE, action) => {
  const { userFavorites } = state;
  const index = array.indexOf(idreceita);
  const recipeNotFound = 1;
  switch (action.type) {
  case types.ADD_FAVORITES:
    userFavorites.push(action.payload);

    // TODO escrever no localStorage

    return ({
      ...state,
      userFavorites,
    });
  case types.REMOVE_FAVOURITES:
    userFavorites.remove(action.payload);
    if (index > recipeNotFound) {
      array.splice(index, 1);
    }

    // TODO escrever no localStorage

    return ({
      ...state,
      userFavorites,
    });
  default:

    // TODO ler do localStorage

    return ({
      ...state,
      userFavorites,
    });
  }
};

export default favorites;
