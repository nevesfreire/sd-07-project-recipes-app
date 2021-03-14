// import React from 'react';
import { getFoodRecipeId, getDrinkRecipeId } from '../services/fetchApi';

const newFunc = async (pathname, setRecipes, setRecipeStr) => {
  if (pathname === '/comidas') {
    const data = await fetchApi(getFoodRecipeId);
    const { meals } = data;
    console.log(meals);
    setRecipes(meals);
    setRecipeStr('strMeal');
  } else if (pathname === '/bebidas') {
    const data = await fetchApi(getDrinkRecipeId);
    const { drinks } = data;
    setRecipeStr('strDrink');
    setRecipes(drinks);
  }
};

function RecipeDetail() {
  newFunc();
}

export default RecipeDetail;
