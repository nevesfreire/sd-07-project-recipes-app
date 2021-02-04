import DetailedDrinkTypes from './types';

export const getDrinkDetail = (drink) => ({
  type: DetailedDrinkTypes.GET,
  payload: drink,
});

export const getRecommendationDrinks = (RecommendatedDrink) => ({
  type: DetailedDrinkTypes.GETRECOMMEND,
  payload: RecommendatedDrink,
});

export const getSpecificDrinkById = (id) => async (dispatch) => {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const request = await fetch(URL);
  const response = await request.json();
  dispatch(getDrinkDetail(response));
};

export const getRecommendatedDrinks = () => async (dispatch) => {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const request = await fetch(URL);
  const response = await request.json();
  dispatch(getRecommendationDrinks(response));
};
