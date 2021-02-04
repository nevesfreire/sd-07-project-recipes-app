import { randomMealAPI, randomDrinkAPI } from '../services';

function useRandomRecipe() {
  const getRandomRecipe = async (type) => {
    if (type === 'comidas') {
      const meal = await randomMealAPI();
      console.log(meal);
      return meal.meals[0].idMeal;
    } if (type === 'bebidas') {
      const drink = await randomDrinkAPI();

      return drink.drinks[0].idDrink;
    }
  };

  return [getRandomRecipe];
}

export default useRandomRecipe;
