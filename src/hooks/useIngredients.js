import { useContext, useState } from 'react';

import { mealIngredientsAPI, drinkIngredientsAPI } from '../services';
import FoodAppContext from '../context/FoodAppContext';

function useIngredients(history, pathname) {
  const { setMealsData, setDrinksData, mealsAPI, drinksAPI } = useContext(FoodAppContext);
  const [ingredients, setIngredients] = useState([]);
  const maximumOfIngredients = 12;
  const minimumOfIngredients = 0;

  const getIngredients = async (type) => {
    if (type === 'comidas') {
      const mealIngredients = [];
      const mealIngredientsResponse = await mealIngredientsAPI();

      const ingredientsData = mealIngredientsResponse.meals
        .slice(minimumOfIngredients, maximumOfIngredients);

      ingredientsData.forEach((element, index) => {
        const ingredient = {
          id: index,
          name: element.strIngredient,
          image_src: `https://www.themealdb.com/images/ingredients/${element.strIngredient}-Small.png`,
        };
        mealIngredients.push(ingredient);
      });

      setIngredients(mealIngredients);
    } else if (type === 'bebidas') {
      const drinkIngredients = [];
      const drinklIngredientsResponse = await drinkIngredientsAPI();

      const ingredientsData = drinklIngredientsResponse.drinks
        .slice(minimumOfIngredients, maximumOfIngredients);

      ingredientsData.forEach((element, index) => {
        const ingredient = {
          id: index,
          name: element.strIngredient1,
          image_src: `https://www.thecocktaildb.com/images/ingredients/${element.strIngredient1}-Small.png`,
        };
        drinkIngredients.push(ingredient);
      });

      setIngredients(drinkIngredients);
    }
  };

  const handleOnClick = async ({ target }) => {
    if (pathname.includes('comidas')) {
      const { name } = target;
      const { meals } = await mealsAPI(name, 'i');
      setMealsData(meals);
      history.push('/comidas');
    } else {
      const { name } = target;
      const { drinks } = await drinksAPI(name, 'i');
      setDrinksData(drinks);
      history.push('/bebidas');
    }
  };

  return [ingredients, getIngredients, handleOnClick];
}

export default useIngredients;
