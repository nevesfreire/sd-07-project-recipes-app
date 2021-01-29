async function fetchRecipes(pageId, query) {
  if (pageId === 'Comidas' && query !== 'random') {
    const url = `https://www.themealdb.com/api/json/v1/1/${query}`;
    const response = await fetch(url);
    const foods = await response.json();
    return foods;
  }
  if (pageId === 'Bebidas' && query !== 'random') {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/${query}`;
    const response = await fetch(url);
    const drinks = await response.json();
    return drinks;
  }
  if (query === 'random') {
    const url = pageId === 'Comidas'
      ? `https://www.themealdb.com/api/json/v1/1/${query}.php`
      : `https://www.thecocktaildb.com/api/json/v1/1/${query}.php`;
    const response = await fetch(url);
    const randomFoodOrDrink = await response.json();
    return randomFoodOrDrink;
  }
}

export default fetchRecipes;
