import { createContext } from 'react';

const RecipesContext = createContext({
  verifyInProgress: () => {},
  inProgress: false,
  setInProgressRecipes: () => {},
  email: '',
  meal: {
    mealsData: [],
    setMealsData: () => {},
    mealsCategoryList: [],
    setMealsCategoryList: () => {},
    mealsFilteredData: [],
    setMealsFilteredData: () => {},
    handleClickCategoryMeals: () => {},
  },
  drink: {
    drinksData: [],
    setDrinksData: () => {},
    drinksCategoryList: [],
    setDrinksCategoryList: () => {},
    drinksFilteredData: [],
    setDrinksFilteredData: () => {},
    handleClickCategoryDrinks: () => {},
  },
});

export default RecipesContext;
