export const randomCocktail = () => {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  return fetch(endpoint)
    .then((response) => response.json())
    .then((json) => json);
};

export const xablau = 0;
