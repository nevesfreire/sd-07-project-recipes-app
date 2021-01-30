export const randomCocktail = () => {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  return fetch(endpoint)
    .then((response) => response.json())
    .then((json) => json);
};

export const drinkIngredients = () => {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  return fetch(endpoint)
    .then((response) => response.json())
    .then((json) => json);
};

export const drinkByIngredient = (ingredient) => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  return fetch(endpoint)
    .then((response) => response.json())
    .then((json) => json);
};
