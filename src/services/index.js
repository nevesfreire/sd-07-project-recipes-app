async function fetchFoodIngredient(ingredient, tipo) {
  let url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  if (tipo === 'comidas') {
    url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  }
  const response = await fetch(url);
  const responsejeson = await response.json();
  return responsejeson;
}

async function fetchFoodName(nome, tipo) {
  let url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nome}`;
  if (tipo === 'comidas') {
    url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${nome}`;
  }
  const response = await fetch(url);
  const responsejeson = await response.json();
  return responsejeson;
}

async function fetchFoodLetter(letter, tipo) {
  let url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`;
  if (tipo === 'comidas') {
    url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`;
  }
  const response = await fetch(url);
  const responsejeson = await response.json();
  return responsejeson;
}

async function fetchFoodCategory(categoria, tipo) {
  let url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categoria}`;
  if (tipo === 'comidas') {
    url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`;
  }
  const response = await fetch(url);
  const responsejeson = await response.json();
  return responsejeson;
}

async function fetchFoodId(id, tipo) {
  let url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  if (tipo === 'comidas') {
    url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  }
  const response = await fetch(url);
  const responsejeson = await response.json();
  return responsejeson;
}

async function fetchRandom(id, tipo) {
  let url = `https://www.thecocktaildb.com/api/json/v1/1/random.php?i=${id}`;
  if (tipo === 'comidas') {
    url = `https://www.themealdb.com/api/json/v1/1/random.php?i=${id}`;
  }
  const response = await fetch(url);
  const responsejeson = await response.json();
  return responsejeson;
}

async function fetchFood() {
  const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(url);
  const responsejeson = await response.json();
  return responsejeson;
}

async function fetchListArea() {
  const url = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  const response = await fetch(url);
  const responsejeson = await response.json();
  return responsejeson;
}

async function fetchArea(area) {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
  const response = await fetch(url);
  const responsejeson = await response.json();
  return responsejeson;
}

async function fetchIngredients(tipo) {
  let url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  if (tipo === 'comidas') {
    url = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  }
  const response = await fetch(url);
  const responsejeson = await response.json();
  return responsejeson;
}

export {
  fetchListArea,
  fetchFood,
  fetchFoodId,
  fetchFoodIngredient,
  fetchFoodName,
  fetchFoodLetter,
  fetchFoodCategory,
  fetchRandom,
  fetchArea,
  fetchIngredients,
};
