import axios from 'axios';

export const getMealByIngredient = (i) => new Promise((resolve, reject) => {
  axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${i}`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

export const getMealByName = (name) => new Promise((resolve, reject) => {
  axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});


export const getMealByFirstLetter = (firstLetter) => new Promise((resolve, reject) => {
  axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});
