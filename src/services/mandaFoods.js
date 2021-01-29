export async function fetchingFoods(radio, input) {
  let url = 'https://www.themealdb.com/api/json/v1/1/';

  if (radio === 'Ingrediente') {
    url += `filter.php?i=${input}`;
    const response = await fetch(url);
    console.log(response);
    const result = await response.json();
    console.log(result);
    return result.meals;
  }

  if (radio === 'Nome') {
    url += `search.php?s=${input}`;
    const response = await fetch(url);
    const result = await response.json();
    return result.meals;
  }

  const ONE = 1;
  if (radio === 'PrimeiraLetra' && input.length === ONE) {
    url += `search.php?f=${input[0]}`;
    const response = await fetch(url);
    const result = await response.json();
    return result.meals;
  }
  alert('Sua busca deve conter somente 1 (um) caracter');
}

export async function fetchingDrinks(radio, input) {
  let url2 = 'https://www.thecocktaildb.com/api/json/v1/1/';

  if (radio === 'Ingrediente') {
    url2 += `filter.php?i=${input}`;
    const response = await fetch(url2);
    const result = await response.json();
    console.log(result);
    return result.drinks;
  }

  if (radio === 'Nome') {
    url2 += `search.php?s=${input}`;
    const response = await fetch(url2);
    const result = await response.json();
    return result.drinks;
  }
  const ONE = 1;
  if (radio === 'PrimeiraLetra' && input.length === ONE) {
    url2 += `search.php?f=${input[0]}`;
    const response = await fetch(url2);
    const result = await response.json();
    return result.drinks;
  }
  alert('Sua busca deve conter somente 1 (um) caracter');
}
