async function fetchFoodIngredient(ingredient, tipo) {
  let url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  if (tipo === 'comidas') {
    url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  }
  const data = await fetch(url).then((response) => response.json());
  return data;
}

async function fetchFoodName(nome, tipo) {
  let url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nome}`;
  if (tipo === 'comidas') {
    url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${nome}`;
  }
  const data = await fetch(url).then((response) => response.json());
  return data;
}

async function fetchFoodLetter(letter, tipo) {
  let url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`;
  if (tipo === 'comidas') {
    url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`;
  }
  const data = await fetch(url).then((response) => response.json());
  return data;
}

export {
  fetchFoodIngredient,
  fetchFoodName,
  fetchFoodLetter,
};
