export const fetchDrinkByIngredient = async (ingredient) => {
  const request = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`,
  );
  const response = await request.json();
  return response;
};

export const fetchDrinkByName = async (name) => {
  const request = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`,
  );
  const response = await request.json();
  return response;
};

export const fetchDrinkByFirstLetter = async (letter) => {
  const request = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`,
  );
  const response = await request.json();
  return response;
};

export const fetchAllDrinkRecipes = async () => {
  const request = await fetch(
    'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
  );
  const response = await request.json();
  return response;
};

export const fetchAllDrinkCategories = async () => {
  const request = await fetch(
    'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
  );
  const response = await request.json();
  return response;
};

export const fetchFilterDrinkByCategory = async (category) => {
  const request = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`,
  );
  const response = await request.json();
  return response;
};

export const fetchDrinkDetailById = async (id) => {
  const request = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
  );
  const response = await request.json();
  return response;
};

export const fetchRandomDrinkRecipes = async () => {
  const request = await fetch(
    'https://www.thecocktaildb.com/api/json/v1/1/random.php.',
  );
  const response = await request.json();
  return response;
};

// export default {
//   fetchDrinkByIngredient,
//   fetchDrinkByName,
//   fetchDrinkByFirstLetter,
//   fetchAllDrinkRecipes,
//   fetchAllDrinkCategories,
//   fetchFilterDrinkByCategory,
//   fetchDrinkDetailById,
//   fetchRandomDrinkRecipes,
// };
