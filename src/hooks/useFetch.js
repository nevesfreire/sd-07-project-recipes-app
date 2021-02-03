import { useContext } from 'react';
import RecipeContext from '../Context/Context';

function useFetch() {
  const zero = 0;
  const cinco = 5;
  const seis = 6;
  const {
    setRecipes,
    setCategoriesFood,
    setCategoriesDrinks,
    setDetailsRecipe,
    setRecomendations,
  } = useContext(RecipeContext);

  async function foodFetch(searchWord, type) {
    const um = 1;
    if (type === 'ingredients') {
      const results = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchWord}`)
        .then((response) => response.json());
      console.log(results);
      return setRecipes(results);
    }
    if (type === 'name') {
      const results = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchWord}`)
        .then((response) => response.json());
      console.log(results);
      return setRecipes(results);
    }
    if (type === 'first-letter' && searchWord.length === um) {
      const results = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchWord}`)
        .then((response) => response.json());
      console.log(results);
      return setRecipes(results);
    }
  }

  async function drinkFetch(searchWord, type) {
    const um = 1;
    if (type === 'ingredients') {
      const results = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchWord}`)
        .then((response) => response.json());
      console.log(results);
      return setRecipes(results);
    }
    if (type === 'name') {
      const results = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchWord}`)
        .then((response) => response.json());
      console.log(results);
      return setRecipes(results);
    }
    if (type === 'first-letter' && searchWord.length === um) {
      const results = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchWord}`)
        .then((response) => response.json());
      return setRecipes(results);
    }
  }

  async function randomFoodFetch() {
    const results = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json());
    return setRecipes(results);
  }

  async function randomDrinkFetch() {
    const results = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json());
    return setRecipes(results);
  }

  async function foodCategories() {
    const results = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
      .then((response) => response.json())
      .then((list) => list.meals.slice(zero, cinco));
    return setCategoriesFood(results);
  }

  async function drinksCategories() {
    const results = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
      .then((response) => response.json())
      .then((list) => list.drinks.slice(zero, cinco));
    return setCategoriesDrinks(results);
  }

  async function selectedCategory(category, type) {
    if (type === 'meals') {
      const doze = 12;
      const results = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        .then((response) => response.json())
        .then((list) => list.meals.slice(zero, doze));
      const newArray = { meals: [...results], type: 'categories' };
      return setRecipes(newArray);
    }
    if (type === 'drinks') {
      const doze = 12;
      const results = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`)
        .then((response) => response.json())
        .then((list) => list.drinks.slice(zero, doze));
      const newArray = { drinks: [...results], type: 'categories' };
      return setRecipes(newArray);
    }
  }

  async function recipeDetailsAPI(id, type) {
    if (type === 'comidas') {
      const results = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json());
      await setDetailsRecipe(results);
    }
    if (type === 'bebidas') {
      const results = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json());
      await setDetailsRecipe(results);
    }
  }

  async function recipeRecomendationsAPI(type) {
    if (type === 'drinks') {
      const results = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json());
      const length6 = results.meals.slice(zero, seis);
      console.log('length', length6);
      await setRecomendations(length6);
    }
    if (type === 'meals') {
      const results = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json());
      const length6 = results.drinks.slice(zero, seis);
      console.log('length', length6);
      await setRecomendations(length6);
    }
  }

  return (
    {
      foodFetch,
      drinkFetch,
      randomFoodFetch,
      randomDrinkFetch,
      drinksCategories,
      foodCategories,
      selectedCategory,
      recipeDetailsAPI,
      recipeRecomendationsAPI,
    }
  );
}

export default useFetch;
