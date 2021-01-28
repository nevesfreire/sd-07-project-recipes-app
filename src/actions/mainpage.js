export const MEALS_REQUEST_STARTED = 'MEALS_REQUEST_STARTED';
export const mealsRequestStarted = () => ({ type: MEALS_REQUEST_STARTED });

export const MEALS_REQUEST = 'MEALS_REQUEST';
export const mealsRequest = (meals) => ({ type: MEALS_REQUEST, meals });

export const MEALS_REQUEST_FAIL = 'MEALS_REQUEST_FAIL';
export const mealsRequestFail = (error) => ({ type: MEALS_REQUEST_FAIL, error });

export function fetchMeals() {
  return async (dispatch) => {
    try {
      dispatch(mealsRequestStarted());
      const requestMeals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
      const meals = await requestMeals.json();
      dispatch(mealsRequest(meals));
    } catch (error) {
      dispatch(mealsRequestFail(error));
    }
  };
}
