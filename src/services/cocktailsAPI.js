export const getCocktailsByIngredient = (i) => new Promise((resolve, reject) => {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${i}`)
    .then((response) => response.json().then((data) => resolve(data)))
    .catch((error) => reject(error));
});

export const getCocktailsByName = (name) => new Promise((resolve, reject) => {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
    .then((response) => response.json().then((data) => resolve(data)))
    .catch((error) => reject(error));
});

export const getCocktailsByFirstLetter = (letter) => new Promise((resolve, reject) => {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`)
    .then((response) => response.json().then((data) => resolve(data)))
    .catch((error) => reject(error));
});

export const getRandomCocktails = () => new Promise((resolve, reject) => {
  fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
    .then((response) => response.json().then((data) => resolve(data)))
    .catch((error) => reject(error));
});
