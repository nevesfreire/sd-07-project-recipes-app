import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.thecocktaildb.com/api/json/v1/1',
});

const limitResult = (array, limit) => {
  const startPositionToShow = 0;

  const smallerArray = array.slice(startPositionToShow, limit);
  console.log(smallerArray);
  return smallerArray;
};

const searchCocktailsByName = async (name, limit) => {
  const response = await api.get(`/search.php?s=${name}`);
  const { drinks } = response.data;
  if (drinks === null) return 'null';
  if (limit) return limitResult(drinks, limit);

  return drinks;
};

const searchCocktailsByFirstLetter = async (letter, limit) => {
  const response = await api.get(`/search.php?f=${letter}`);
  const { drinks } = response.data;
  if (drinks === undefined) return 'undefined';
  if (limit) return limitResult(drinks, limit);

  return drinks;
};

const searchCocktailsByIngredient = async (ingredient, limit) => {
  const response = await api.get(`/filter.php?i=${ingredient}`);
  const { drinks } = response.data;
  if (drinks === undefined) return 'undefined';
  if (limit) return limitResult(drinks, limit);

  return drinks;
};

const searchCocktailsByCategory = async (category, limit) => {
  const response = await api.get(`/filter.php?c=${category}`);
  const { drinks } = response.data;

  if (limit) return limitResult(drinks, limit);

  return drinks;
};

const getCocktailDetailsById = async (id) => {
  const response = await api.get(`/lookup.php?i=${id}`);
  const drinkDetails = response.data.drinks[0];

  return drinkDetails;
};

const getCocktails = async (limit) => {
  const response = await api.get('/search.php?s=');
  const { drinks } = response.data;

  if (limit) return limitResult(drinks, limit);

  return drinks;
};

const getRandomCocktail = async () => {
  const response = await api.get('/random.php');
  const randomDrink = response.data.drinks[0];

  return randomDrink;
};

const getCocktailCategoryList = async (limit) => {
  const response = await api.get('list.php?c=list');
  const { drinks: drinkCategories } = response.data;

  if (limit) return limitResult(drinkCategories, limit);

  return drinkCategories;
};

const getCocktailIngredientList = async (limit) => {
  const response = await api.get('list.php?i=list');
  const { drinks: drinkIngredients } = response.data;

  if (limit) return limitResult(drinkIngredients, limit);

  return drinkIngredients;
};

export default {
  searchCocktailsByName,
  searchCocktailsByFirstLetter,
  searchCocktailsByIngredient,
  searchCocktailsByCategory,
  getCocktailDetailsById,
  getRandomCocktail,
  getCocktailCategoryList,
  getCocktailIngredientList,
  getCocktails,
};
