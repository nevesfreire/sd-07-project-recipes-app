export const handleClickMeals = (recipeId, ingredMeasures) => {
  const getRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (getRecipes) {
    const newRecipe = {
      ...getRecipes,
      meals: { ...getRecipes.meals, [recipeId]: ingredMeasures },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(newRecipe));
  } else {
    const newRecipe = {
      cocktails: {},
      meals: { [recipeId]: ingredMeasures },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(newRecipe));
  }
};

export const handleClickCocktails = (recipeId, ingredMeasures) => {
  const getRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (getRecipes) {
    const newRecipe = {
      ...getRecipes,
      cocktails: { ...getRecipes.cocktails, [recipeId]: ingredMeasures },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(newRecipe));
  } else {
    const newRecipe = {
      cocktails: { [recipeId]: ingredMeasures },
      meals: {},
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(newRecipe));
  }
};
