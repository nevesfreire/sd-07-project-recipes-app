export async function fetchingFoods(radio, input) {
  let url = 'https://www.themealdb.com/api/json/v1/1/';

  if (radio === 'Ingrediente') {
    url += `filter.php?i=${input}`;
    const response = await fetch(url);
    console.log(response);
    const result = await response.json();
    return result.meals;
  }

  if (radio === 'Nome') {
    url += `search.php?s=${input}`;
    const response = await fetch(url);
    const result = await response.json();
    return result.meals;
  }

  if (radio === 'PrimeiraLetra') {
    url += `search.php?f=${input[0]}`;
    const response = await fetch(url);
    const result = await response.json();
    return result.meals;
  }
}

export async function fetchingDrinks(radio, input) {
  let url = 'https://www.thecocktaildb.com/api/json/v1/1/';

  if (radio === 'Ingrediente') {
    url += `filter.php?i=${input}`;
    const response = await fetch(url);
    console.log(response);
    const result = await response.json();
    return result.meals;
  }

  if (radio === 'Nome') {
    url += `search.php?s=${input}`;
    const response = await fetch(url);
    const result = await response.json();
    return result.meals;
  }

  if (radio === 'PrimeiraLetra') {
    url += `search.php?f=${input[0]}`;
    const response = await fetch(url);
    const result = await response.json();
    return result.meals;
  }
}
