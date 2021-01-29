import { createContext } from 'react';

const RecipesContext = createContext({
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
