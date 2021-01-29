import axios from 'axios';

export const getMealsByIngredient = (i) => new Promise((resolve, reject) => {
  axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${i}`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

export const getMealsByName = (name) => new Promise((resolve, reject) => {
  axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

export const getMealsByFirstLetter = (firstLetter) => new Promise((resolve, reject) => {
  axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

export const getRandomMeals = () => new Promise((resolve, reject) => {
  axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});
