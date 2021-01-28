// TheMealDB API

// categorias: https://www.themealdb.com/api/json/v1/1/list.php?c=list
// areas: https://www.themealdb.com/api/json/v1/1/list.php?a=list
// ingredientes: https://www.themealdb.com/api/json/v1/1/list.php?i=list

const getCategories = async () => {
  const categories = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
    .then((data) => data.json());
  return categories;
};

const searchByIngredient = async (ingredient) => {
  const data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    .then((dataJson) => dataJson.json());
  return data;
};

const searchByName = async (name) => {
  const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    .then((dataJson) => dataJson.json());
  return data;
};

const searchByFirstLetter = async (letter) => {
  if (letter.length > 1) return alert('Sua busca deve conter somente 1 (um) caracter');
  const data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${letter}`)
    .then((dataJson) => dataJson.json());
  return data;
};

export { getCategories, searchByIngredient, searchByName, searchByFirstLetter };
