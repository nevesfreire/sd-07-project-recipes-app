import DetailedMealTypes from './types';

export const getMealDetail = (meal) => ({
  type: DetailedMealTypes.GET,
  payload: meal,
});

export const getRecommendationMeals = (RecommendatedMeal) => ({
  type: DetailedMealTypes.GETRECOMMEND,
  payload: RecommendatedMeal,
});

export const setDoneMeals = (doneMeals, hour) => ({
  type: DetailedMealTypes.SETDONEMEALS,
  payload: {
    doneMeals,
    hour,
  },
});

export const getSpecificMealById = (id) => async (dispatch) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const request = await fetch(URL);
  const response = await request.json();
  dispatch(getMealDetail(response));
};

export const getRecommendatedMeals = () => async (dispatch) => {
  const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const request = await fetch(URL);
  const response = await request.json();
  dispatch(getRecommendationMeals(response));
};

export const getDoneMeals = (idDoneMeals, hour) => async (dispatch) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idDoneMeals}`;
  const request = await fetch(URL);
  const response = await request.json();
  dispatch(setDoneMeals(response, hour));
};
