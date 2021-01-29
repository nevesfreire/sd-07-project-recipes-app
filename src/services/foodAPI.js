
export const getCurrenceRecipesFoodsIngredients = (filter) => {
  const ingredients = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${filter}`;
  return fetch(ingredients)
    .then((response) => (
      response.json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ));
};

export const getCurrenceRecipesFoodsName = (filter) => {
  const name = `https://www.themealdb.com/api/json/v1/1/search.php?s=${filter}`;
  return fetch(name)
    .then((response) => (
      response.json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ));
};

export const getCurrenceRecipesFoodsFirstLetter = (filter) => {
  const firstLetter = `https://www.themealdb.com/api/json/v1/1/search.php?f=${filter}`;
  return fetch(firstLetter)
    .then((response) => (
      response.json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ));
};


