import doneRecipesTypes from './type';

const setDoneMeal = (recipe) => ({
  type: doneRecipesTypes.DONERECIPE,
  payload: recipe,
});

export default setDoneMeal;
