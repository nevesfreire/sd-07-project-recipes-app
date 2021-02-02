export const getMealsByIngredient = (i) => new Promise((resolve, reject) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${i}`)
    .then((response) => response.json().then((data) => resolve(data)))
    .catch((error) => reject(error));
});

export const getMealsByName = (name) => new Promise((resolve, reject) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    .then((response) => response.json().then((data) => resolve(data)))
    .catch((error) => reject(error));
});

export const getMealsByFirstLetter = (firstLetter) => new Promise((resolve, reject) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`)
    .then((response) => response.json().then((data) => resolve(data)))
    .catch((error) => reject(error));
});

export const getRandomMeals = () => new Promise((resolve, reject) => {
  fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    .then((response) => response.json().then((data) => resolve(data)))
    .catch((error) => reject(error));
});

export const getMealsByCategory = (category) => new Promise((resolve, reject) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    .then((response) => response.json().then((data) => resolve(data)))
    .catch((error) => reject(error));
});

export const getMealsCategories = () => new Promise((resolve, reject) => {
  fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
    .then((response) => response.json().then((data) => resolve(data)))
    .catch((error) => reject(error));
});

export const getMealsDetailsById = (id) => new Promise((resolve, reject) => {
  axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});
