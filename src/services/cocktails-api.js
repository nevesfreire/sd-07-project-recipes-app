import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.thecocktaildb.com/api/json/v1/1',
});

const searchCocktailsByName = async (name) => {
  const response = await api.get(`/search.php?s=${name}`);
  const { drinks } = response.data;

  return drinks;
};

const searchCocktailsByFirstLetter = async (letter) => {
  const response = await api.get(`/search.php?f=${letter}`);
  const { drinks } = response.data;

  return drinks;
};

const searchCocktailsByIngredient = async (ingredient) => {
  const response = await api.get(`/filter.php?i=${ingredient}`);
  const { drinks } = response.data;

  return drinks;
};

const searchCocktailsByCategory = async (category) => {
  const response = await api.get(`/filter.php?c=${category}`);
  const { drinks } = response.data;

  return drinks;
};

const getCocktailsDetailsById = async (id) => {
  const response = await api.get(`/lookup.php?i=${id}`);
  const drinkDetails = response.data.drinks[0];

  return drinkDetails;
};

const getRandomCocktail = async () => {
  const response = await api.get('/random.php');
  const randomDrink = response.data.drinks[0];

  return randomDrink;
};

const getCocktailCategoryList = async () => {
  const response = await api.get('list.php?c=list');
  const { drinks } = response.data;

  return drinks;
};

const getCocktailIngredientList = async () => {
  const response = await api.get('list.php?i=list');
  const { drinks } = response.data;

  return drinks;
};

export default {
  searchCocktailsByName,
  searchCocktailsByFirstLetter,
  searchCocktailsByIngredient,
  searchCocktailsByCategory,
  getCocktailsDetailsById,
  getRandomCocktail,
  getCocktailCategoryList,
  getCocktailIngredientList,
};
