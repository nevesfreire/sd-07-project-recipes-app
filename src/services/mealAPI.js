export const randomMeal = () => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/random.php';
  return fetch(endpoint)
    .then((response) => response.json())
    .then((json) => json);
};

export const mealIngredients = () => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  return fetch(endpoint)
    .then((response) => response.json())
    .then((json) => json);
};
