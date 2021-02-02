import DetailedDrinkTypes from './types';

export const getDrinkDetail = (drink) => ({
  type: DetailedDrinkTypes.GET,
  payload: drink,
});

export const getSpecificDrinkById = (id) => async (dispatch) => {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const request = await fetch(URL);
  const response = await request.json();
  dispatch(getDrinkDetail(response));
};
