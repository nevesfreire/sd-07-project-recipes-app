const getMealWithId = (id) => (
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((response) => (
      response
        .json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);

export const getDrinkWithId = (id) => (
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((drinkResponse) => (
      drinkResponse
        .json()
        .then((json) => (drinkResponse.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);

export const getRecomendationDrink = () => (
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=`)
  .then((drinkResponse) => (
    drinkResponse
      .json()
      .then((json) => (drinkResponse.ok ? Promise.resolve(json) : Promise.reject(json)))
  ))
);

export const getRecomendationMeal = (id) => (
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    .then((response) => (
      response
        .json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);

export default getMealWithId;
