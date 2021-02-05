// import apiTheCocktailDB from '../../services/apiTheCocktailDB';
// import apiTheMealDB from '../../services/apiTheMealDB';
import types from './types';

export const sendLoginInfo = (payload) => (
  {
    type: types.LOGIN_INFO,
    payload,
  }
);

export const sendMealRecipes = (payload) => (
  {
    type: types.MEAL_RECIPES_RESULTS,
    payload,
  }
);

export const sendDrinkRecipes = (payload) => (
  {
    type: types.DRINK_RECIPES_RESULTS,
    payload,
  }
);

export const addFavourites = (payload) => (
  {
    type: types.ADD_FAVOURITES,
    payload,
  }
);

export const removeFavourites = (payload) => (
  {
    type: types.REMOVE_FAVOURITES,
    payload,
  }
);

// const isFetching = () => (
//   {
//     type: types.IS_FETCHING,
//   }
// );

// const mealRequestSuccess = (payload) => (
//   {
//     type: types.REQUEST_SUCCESS,
//     payload,
//   }
// );
//
// export function fetchMealRecipes(e) {
//   return async (dispatch) => {
//     dispatch(isFetching());
//     const mealRecipes = await apiTheMealDB(e);
//     dispatch(mealRequestSuccess(mealRecipes));
//   };
// }

// if (search === 'drinks') {
//   const drinkRecipes = await apiTheCocktailDB(search);
//   dispatch(requestSuccess(drinkRecipes));
// }
