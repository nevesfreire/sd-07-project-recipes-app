async function fetchRecipes(pageId, query) {
  if (pageId === 'Comidas') {
    const url = `https://www.themealdb.com/api/json/v1/1/${query}`;
    const response = await fetch(url);
    const foods = await response.json();
    return foods;
  }
  if (pageId === 'Bebidas') {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/${query}`;
    const response = await fetch(url);
    const drinks = await response.json();
    return drinks;
  }
}

export default fetchRecipes;
