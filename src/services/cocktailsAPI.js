import axios from 'axios';

export const getCocktailsByIngredient = (i) => new Promise((resolve, reject) => {
  axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${i}`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

export const getCocktailsByName = (name) => new Promise((resolve, reject) => {
  axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

export const getCocktailsByFirstLetter = (firstLetter) => new Promise((resolve, reject) => {
  axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});
