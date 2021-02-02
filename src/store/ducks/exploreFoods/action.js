import randomFoodType from './types';

export const getRandomFood = (randomFood) => ({
  type: randomFoodType.FOODS,
  payload: randomFood,
});

export const ExploreRandomFood = () => async (dispatch) => {
  const URL = 'https://www.themealdb.com/api/json/v1/1/random.php';
  const request = await fetch(URL);
  const response = await request.json();
  dispatch(getRandomFood(response));
};
