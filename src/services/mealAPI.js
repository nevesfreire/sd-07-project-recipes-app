export const randomMeal = () => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/random.php';
  return fetch(endpoint)
    .then((response) => response.json())
    .then((json) => json);
};

export const xablau = 0;
