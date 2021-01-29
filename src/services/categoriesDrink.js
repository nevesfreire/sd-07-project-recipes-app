async function CategoriesDrinks(drink) {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${drink}`;
  const data = await fetch(endpoint).then((response) => response.json());
  const { drinks } = data;
  return drinks;
}

export default CategoriesDrinks;
