export const addFood = (food) => ({ type: 'ADD_FOOD', food });

export const requestingData = () => ({ type: 'REQUEST_FOOD' });

export function fetchFoodById(id) {
  return async (dispatch) => {
    dispatch(requestingData());
    const resolve = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
    );
    const json = await resolve.json();
    return dispatch(addFood(json));
  };
}

export function fetchFoodByIngredient(ingredient) {
  return async (dispatch) => {
    dispatch(requestingData());
    const resolve = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`,
    );
    const json = await resolve.json();
    return dispatch(addFood(json));
  };
}

export function fetchFoodByName(name) {
  return async (dispatch) => {
    dispatch(requestingData());
    const resolve = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`,
    );
    const json = await resolve.json();
    return dispatch(addFood(json));
  };
}
