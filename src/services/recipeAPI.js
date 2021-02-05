import {
  mapMealAndDrinkToRecipe,
  mapShortMealAndDrinkToRecipe,
} from './helper';

const BASE_MEAL_URL = 'https://www.themealdb.com/api/json/v1/1';
const BASE_COCKTAIL_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

const END_POINT_SEARCH = '/search.php?s=';
const END_POINT_SEARCH_BY_FIRST_LETTER = '/search.php?f=';
const END_POINT_CATEGORY_LIST = '/list.php?c=list';
const END_POINT_INGREDIENT_LIST = '/list.php?i=list';
const END_POINT_AREA_LIST = '/list.php?a=list';
const END_POINT_RANDOM = '/random.php';
const END_POINT_LOOKUP_BY_ID = '/lookup.php?i=';

const END_POINT_FILTER = '/filter.php?';
const BY_CATEGORY = 'c=';
const BY_INGREDIENT = 'i=';
const BY_AREA = 'a=';

export const FILTER_TYPES = {
  NAME: 'name',
  CATEGORY: 'category',
  INGREDIENT: 'ingredient',
  FIRST_LETTER: 'firstLetter',
  AREA: 'area',
  RANDON: 'random',
};

export const getRecipesByName = async (type, name = '') => {
  const GET_RECIPES_BY_NAME_URL = (type.includes('comidas')
    ? BASE_MEAL_URL : BASE_COCKTAIL_URL)
    + END_POINT_SEARCH
    + name;
  const response = await fetch(GET_RECIPES_BY_NAME_URL);
  const result = await response.json();
  return type.includes('comidas')
    ? mapMealAndDrinkToRecipe(result.meals)
    : mapMealAndDrinkToRecipe(result.drinks);
};

export const getRecipes = (type) => getRecipesByName(type);

export const getRecipesByFirstLetter = async (type, firstLetter) => {
  const GET_RECIPES_BY_FIRST_LETTER_URL = (type.includes('comidas')
    ? BASE_MEAL_URL : BASE_COCKTAIL_URL)
    + END_POINT_SEARCH_BY_FIRST_LETTER
    + firstLetter;
  const response = await fetch(GET_RECIPES_BY_FIRST_LETTER_URL);
  const result = await response.json();
  return type.includes('comidas')
    ? mapMealAndDrinkToRecipe(result.meals)
    : mapMealAndDrinkToRecipe(result.drinks);
};

export const getRecipesByIngredient = async (type, ingredient) => {
  const GET_RECIPES_BY_INGREDIENT_URL = (type.includes('comidas')
    ? BASE_MEAL_URL : BASE_COCKTAIL_URL)
    + END_POINT_FILTER + BY_INGREDIENT
    + ingredient;
  const response = await fetch(GET_RECIPES_BY_INGREDIENT_URL);
  const result = await response.json();
  return type.includes('comidas')
    ? mapShortMealAndDrinkToRecipe(result.meals)
    : mapShortMealAndDrinkToRecipe(result.drinks);
};

export const getRecipesByArea = async (area) => {
  const GET_RECIPES_BY_AREA_URL = BASE_MEAL_URL
    + END_POINT_FILTER + BY_AREA
    + area;
  const response = await fetch(GET_RECIPES_BY_AREA_URL);
  const result = await response.json();
  return mapShortMealAndDrinkToRecipe(result.meals);
};

export const getRecipesByCategory = async (type, category) => {
  const GET_RECIPES_BY_CATEGORY_URL = (type.includes('comidas')
    ? BASE_MEAL_URL : BASE_COCKTAIL_URL)
    + END_POINT_FILTER + BY_CATEGORY
    + category;
  const response = await fetch(GET_RECIPES_BY_CATEGORY_URL);
  const result = await response.json();
  return type.includes('comidas')
    ? mapShortMealAndDrinkToRecipe(result.meals)
    : mapShortMealAndDrinkToRecipe(result.drinks);
};

export const getCategories = async (type) => {
  const GET_CATEGORIES_URL = (type.includes('comidas')
    ? BASE_MEAL_URL : BASE_COCKTAIL_URL) + END_POINT_CATEGORY_LIST;
  const response = await fetch(GET_CATEGORIES_URL);
  const result = await response.json();
  return type.includes('comidas')
    ? mapShortMealAndDrinkToRecipe(result.meals)
    : mapShortMealAndDrinkToRecipe(result.drinks);
};

export const getRandom = async (type) => {
  const GET_RANDOM_URL = (type.includes('comidas')
    ? BASE_MEAL_URL : BASE_COCKTAIL_URL) + END_POINT_RANDOM;
  const response = await fetch(GET_RANDOM_URL);
  const result = await response.json();
  return type.includes('comidas')
    ? mapMealAndDrinkToRecipe(result.meals)
    : mapMealAndDrinkToRecipe(result.drinks);
};

export const getIngredientList = async (type) => {
  const GET_INGREDIENTS_URL = (type.includes('comidas')
    ? BASE_MEAL_URL : BASE_COCKTAIL_URL) + END_POINT_INGREDIENT_LIST;
  const response = await fetch(GET_INGREDIENTS_URL);
  const result = await response.json();
  return type.includes('comidas') ? result.meals : result.drinks;
};

export const getAreas = async () => {
  const GET_AREAS = BASE_MEAL_URL + END_POINT_AREA_LIST;
  const response = await fetch(GET_AREAS);
  const result = await response.json();
  return result.meals;
};

export const getRecipeById = async (type, recipeId) => {
  const GET_RECIPE_BY_ID = (type.includes('comidas')
    ? BASE_MEAL_URL : BASE_COCKTAIL_URL)
    + END_POINT_LOOKUP_BY_ID
    + recipeId;
  const response = await fetch(GET_RECIPE_BY_ID);
  const result = await response.json();
  return type.includes('comidas')
    ? mapMealAndDrinkToRecipe(result.meals)
    : mapMealAndDrinkToRecipe(result.drinks);
};
