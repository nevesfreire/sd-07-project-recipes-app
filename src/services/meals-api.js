import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.themealdb.com/api/json/v1/1',
});

const startPositionToShow = 0;

const searchMealsByName = async (name, limit) => {
  const response = await api.get(`/search.php?s=${name}`);
  const { meals } = response.data;

  if (limit) {
    const mealsWithLessItems = meals.slice(startPositionToShow, limit);
    return mealsWithLessItems;
  }

  return meals;
};

const searchMealsByFirstLetter = async (letter, limit) => {
  const response = await api.get(`/search.php?f=${letter}`);
  const { meals } = response.data;

  if (limit) {
    const mealsWithLessItems = meals.slice(startPositionToShow, limit);
    return mealsWithLessItems;
  }

  return meals;
};

const searchMealsByIngredient = async (ingredient, limit) => {
  const response = await api.get(`/filter.php?i=${ingredient}`);
  const { meals } = response.data;

  if (limit) {
    const mealsWithLessItems = meals.slice(startPositionToShow, limit);
    return mealsWithLessItems;
  }

  return meals;
};

const searchMealsByCategory = async (category, limit) => {
  const response = await api.get(`/filter.php?c=${category}`);
  const { meals } = response.data;

  if (limit) {
    const mealsWithLessItems = meals.slice(startPositionToShow, limit);
    return mealsWithLessItems;
  }

  return meals;
};

const searchMealsByArea = async (area, limit) => {
  const response = await api.get(`/filter.php?a=${area}`);
  const { meals } = response.data;

  if (limit) {
    const mealsWithLessItems = meals.slice(startPositionToShow, limit);
    return mealsWithLessItems;
  }

  return meals;
};

const getMeals = async (limit) => {
  const response = await api.get('/search.php?s=');
  const { meals } = response.data;

  if (limit) {
    const mealsWithLessItems = meals.slice(startPositionToShow, limit);
    return mealsWithLessItems;
  }

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

const getMealCategories = async (limit) => {
  const response = await api.get('/categories.php');
  const { categories } = response.data;

  if (limit) {
    const categoriesWithLessItems = categories.slice(startPositionToShow, limit);
    return categoriesWithLessItems;
  }

  return categories;
};

const getMealCategoryList = async (limit) => {
  const response = await api.get('list.php?c=list');
  const { meals: mealCategories } = response.data;

  if (limit) {
    const mealCategoriesWithLessItems = meals.slice(startPositionToShow, limit);
    return mealCategoriesWithLessItems;
  }

  return mealCategories;
};

const getMealIngredientList = async (limit) => {
  const response = await api.get('list.php?i=list');
  const { meals: mealIngredients } = response.data;

  if (limit) {
    const mealIngredientsWithLessItems = meals.slice(startPositionToShow, limit);
    return mealIngredientsWithLessItems;
  }

  return mealIngredients;
};

const getMealAreaList = async (limit) => {
  const response = await api.get('list.php?a=list');
  const { meals: mealAreas } = response.data;

  if (limit) {
    const mealAreasWithLessItems = meals.slice(startPositionToShow, limit);
    return mealAreasWithLessItems;
  }

  return mealAreas;
};

export default {
  searchMealsByName,
  searchMealsByFirstLetter,
  searchMealsByIngredient,
  searchMealsByCategory,
  searchMealsByArea,
  getMeals,
  getMealDetailsById,
  getRandomMeal,
  getMealCategories,
  getMealCategoryList,
  getMealIngredientList,
  getMealAreaList,
};
