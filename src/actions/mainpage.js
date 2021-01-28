export const REQUEST_STARTED = 'REQUEST_STARTED';
export const requestStarted = () => ({ type: REQUEST_STARTED });

export const MEALS_REQUEST = 'MEALS_REQUEST';
export const mealsRequest = (meals) => ({ type: MEALS_REQUEST, meals });

export const COCKTAILS_REQUEST = 'COCKTAILS_REQUEST';
export const cocktailsRequest = (drinks) => ({ type: COCKTAILS_REQUEST, drinks });

export const REQUEST_FAIL = 'REQUEST_FAIL';
export const requestFail = (error) => ({ type: REQUEST_FAIL, error });

export function fetchCards(isMeal) {
  return async (dispatch) => {
    if (isMeal) {
      try {
        dispatch(requestStarted());
        const requestMeals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
        const result = await requestMeals.json();
        dispatch(mealsRequest(result.meals));
      } catch (error) {
        dispatch(requestFail(error));
      }
    }
    try {
      dispatch(requestStarted());
      const requestCocktails = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=`);
      const result = await requestCocktails.json();
      dispatch(cocktailsRequest(result.drinks));
    } catch (error) {
      dispatch(requestFail(error));
    }
  };
}
