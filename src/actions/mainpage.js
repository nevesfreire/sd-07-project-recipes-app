export const REQUEST_STARTED = 'REQUEST_STARTED';
export const requestStarted = () => ({ type: REQUEST_STARTED });

export const MEALS_REQUEST = 'MEALS_REQUEST';
export const mealsRequest = (meals) => ({ type: MEALS_REQUEST, meals });

export const COCKTAILS_REQUEST = 'COCKTAILS_REQUEST';
export const cocktailsRequest = (drinks) => ({ type: COCKTAILS_REQUEST, drinks });

export const MEAL_CATEGORIES_REQUEST = 'MEAL_CATEGORIES_REQUEST';
export const mealCategoriesRequest = (categories) => ({
  type: MEAL_CATEGORIES_REQUEST, categories,
});

export const DRINK_CATEGORIES_REQUEST = 'DRINK_CATEGORIES_REQUEST';
export const drinkCategoriesRequest = (categories) => ({
  type: DRINK_CATEGORIES_REQUEST, categories,
});

export const REQUEST_FAIL = 'REQUEST_FAIL';
export const requestFail = (error) => ({ type: REQUEST_FAIL, error });

export function fetchCards(isMeal) {
  return async (dispatch) => {
    if (isMeal) {
      try {
        dispatch(requestStarted());
        const requestMeals = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const requestMealCategories = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
        const result = await requestMeals.json();
        const categories = await requestMealCategories.json();
        dispatch(mealsRequest(result.meals));
        dispatch(mealCategoriesRequest(categories.meals));
      } catch (error) {
        dispatch(requestFail(error));
      }
    }
    try {
      dispatch(requestStarted());
      const requestCocktails = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const requestDrinkCategories = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const result = await requestCocktails.json();
      const categories = await requestDrinkCategories.json();
      dispatch(cocktailsRequest(result.drinks));
      dispatch(drinkCategoriesRequest(categories.drinks));
    } catch (error) {
      dispatch(requestFail(error));
    }
  };
}
