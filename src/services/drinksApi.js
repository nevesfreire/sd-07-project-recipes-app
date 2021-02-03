export async function drinkByName(name) {
  const endpoint = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
  const response = await endpoint.json();
  const { drinks } = response;
  return drinks;
}
export async function drinkByIngredient(ingredients) {
  const endpoint = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredients}`);
  const response = await endpoint.json();
  const { drinks } = response;
  return drinks;
}
export async function drinkByLetter(firstLetter) {
  const endpoint = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`);
  const response = await endpoint.json();
  const { drinks } = response;
  return drinks;
}

export async function getInitialDrink() {
  const response = await drinkByName('');
  const list = [];
  const doze = 12;
  Object.entries(response).forEach((drink, index) => {
    const { strDrink, strDrinkThumb, strCategory } = drink[1];
    if (index < doze) list.push({ strDrink, strDrinkThumb, strCategory });
  });
  return list;
}
