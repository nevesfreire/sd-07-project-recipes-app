import { createContext } from 'react';

const RecipesContext = createContext({
  filteredDoneRecipes: [],
  handleClickFilterRecipesMade: () => {},
  checkFavorite: () => {},
  handleClickFavorite: () => {},
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
  isSearchBarActive: false,
  setIsSearchBarActive: () => {},
  searchData: '',
  setSearchData: () => {},
});

export default RecipesContext;
