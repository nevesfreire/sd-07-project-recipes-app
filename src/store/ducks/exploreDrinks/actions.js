// Seguir os exemplos dos arquivos da pasta login.
import DrinksExplore from './types';

export const getRandomDrink = (randomDrink) => ({
  type: DrinksExplore.DRINKS,
  payload: randomDrink,
});

export const ExploreRandomDrinks = () => async (dispatch) => {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  const request = await fetch(URL);
  const response = await request.json();
  dispatch(getRandomDrink(response));
};
