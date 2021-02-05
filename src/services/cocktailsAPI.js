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

export const getCocktailsByCategory = (category) => new Promise((resolve, reject) => {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`)
    .then((response) => response.json().then((data) => resolve(data)))
    .catch((error) => reject(error));
});

export const getCocktailsCategories = () => new Promise((resolve, reject) => {
  fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
    .then((response) => response.json().then((data) => resolve(data)))
    .catch((error) => reject(error));
});

<<<<<<< HEAD
export const getCocktailsDetailsById = (id) => new Promise((resolve, reject) => {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
=======
export const getCocktailsIngredients = () => new Promise((resolve, reject) => {
  fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
>>>>>>> b3c2e3ff08005342b86b01e0af9a36d299140394
    .then((response) => response.json().then((data) => resolve(data)))
    .catch((error) => reject(error));
});
