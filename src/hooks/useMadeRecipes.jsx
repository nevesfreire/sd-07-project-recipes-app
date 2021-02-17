import { useMemo, useState } from 'react';
import useLocalStorage from './useLocalStorage';

const getLists = (recipesInProgress, filters) => {
  const defaultRecipes = { cocktails: [], meals: [] };
  const recipes = recipesInProgress || defaultRecipes;

  const { drink, food } = filters;

  if (food) {
    const cocktailList = recipes.cocktails || [];
    const cocktails = Object.keys(cocktailList);
    return [cocktails, []];
  }

  if (drink) {
    const mealsList = recipes.meals || [];
    const meals = Object.keys(mealsList);
    return [[], meals];
  }

  const cocktailList = recipes.cocktails || [];
  const cocktails = Object.keys(cocktailList);
  const mealsList = recipes.meals || [];
  const meals = Object.keys(mealsList);

  return [cocktails, meals];
};

export default function useMadeRecipes() {
  const [filters, setFilters] = useState({ drink: false, food: false });
  const [recipesInProgress] = useLocalStorage('inProgressRecipes');
  const [drinks, foods] = useMemo(() => getLists(recipesInProgress, filters),
    [recipesInProgress, filters]);

  return [{ drinks, foods }, setFilters];
}
