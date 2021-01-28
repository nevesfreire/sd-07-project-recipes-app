const fetchFoodByIngredient = async (ingredient) => {
  const request = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`,
  );
  const response = await request.json();
  return response;
};

const fetchFoodByName = async (name) => {
  const request = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`,
  );
  const response = await request.json();
  return response;
};

const fetchFoodByFirstLetter = async (letter) => {
  const request = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`,
  );
  const response = await request.json();
  return response;
};

const fetchAllFoodRecipes = async () => {
  const request = await fetch(
    'https://www.themealdb.com/api/json/v1/1/search.php?s=',
  );
  const response = await request.json();
  return response;
};

const fetchAllFoodCategories = async () => {
  const request = await fetch(
    'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
  );
  const response = await request.json();
  return response;
};

const fetchFilterFoodByCategory = async (category) => {
  const request = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`,
  );
  const response = await request.json();
  return response;
};

const fetchFoodDetailById = async (id) => {
  const request = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
  );
  const response = await request.json();
  return response;
};

const fetchRandomFoodRecipes = async () => {
  const request = await fetch(
    'https://www.themealdb.com/api/json/v1/1/random.php',
  );
  const response = await request.json();
  return response;
};

export {
  fetchFoodByIngredient,
  fetchFoodByName,
  fetchFoodByFirstLetter,
  fetchAllFoodRecipes,
  fetchAllFoodCategories,
  fetchFilterFoodByCategory,
  fetchFoodDetailById,
  fetchRandomFoodRecipes,
};
