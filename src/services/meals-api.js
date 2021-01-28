import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.themealdb.com/api/json/v1/1',
});

const searchMealsByName = async (name) => {
  const response = await api.get(`/search.php?s=${name}`);
  const { meals } = response.data;

  return meals;
};

const searchMealsByFirstLetter = async (letter) => {
  const response = await api.get(`/search.php?f=${letter}`);
  const { meals } = response.data;

  return meals;
};

const searchMealsByIngredient = async (ingredient) => {
  const response = await api.get(`/filter.php?i=${ingredient}`);
  const { meals } = response.data;

  return meals;
};

const searchMealsByCategory = async (category) => {
  const response = await api.get(`/filter.php?c=${category}`);
  const { meals } = response.data;

  return meals;
};

const searchMealsByArea = async (area) => {
  const response = await api.get(`/filter.php?a=${area}`);
  const { meals } = response.data;

  return meals;
};

const getMeals = async (limit) => {
  const startPositionToShow = 0;

  const response = await api.get('/search.php?s=');
  const { meals } = response.data;
  const limitToShow = meals.slice(startPositionToShow, limit);

  return limitToShow;
};

const getAllMeals = async () => {
  const response = await api.get('/search.php?s=');
  const { meals } = response.data;

  return meals;
};

const getMealDetailsById = async (id) => {
  const response = await api.get(`/lookup.php?i=${id}`);
  const mealDetails = response.data.meals[0];

  return mealDetails;
};

const getRandomMeal = async () => {
  const response = await api.get('/random.php');
  const randomMeal = response.data.meals[0];

  return randomMeal;
};

const getMealCategories = async () => {
  const response = await api.get('/categories.php');
  const { categories } = response.data;

  return categories;
};

const getMealCategoryList = async (limit) => {
  const startPositionToShow = 0;

  const response = await api.get('list.php?c=list');
  const { meals } = response.data;
  const limitToShow = meals.slice(startPositionToShow, limit);

  return limitToShow;
};

const getMealIngredientList = async () => {
  const response = await api.get('list.php?i=list');
  const { meals } = response.data;

  return meals;
};

const getMealAreaList = async () => {
  const response = await api.get('list.php?a=list');
  const { meals } = response.data;

  return meals;
};

export default {
  searchMealsByName,
  searchMealsByFirstLetter,
  searchMealsByIngredient,
  searchMealsByCategory,
  searchMealsByArea,
  getMeals,
  getAllMeals,
  getMealDetailsById,
  getRandomMeal,
  getMealCategories,
  getMealCategoryList,
  getMealIngredientList,
  getMealAreaList,
};
