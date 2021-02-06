import React from 'react';

const newFunc = async (pathname, setRecipes, setRecipeStr) => {
  if (pathname === '/comidas') {
    const data = await fetchApi(allFood);
    const { meals } = data;
    console.log(meals);
    setRecipes(meals);
    setRecipeStr('strMeal');
  } else if (pathname === '/bebidas') {
    const data = await fetchApi(allDrink);
    const { drinks } = data;
    setRecipeStr('strDrink');
    setRecipes(drinks);
  }
};

function RecipeDetail() {
  newFunc();
}

export default RecipeDetail;
