const URL = 'https://www.thecocktaildb.com/api/json/v1/1/';

const ENDPOINT = {
  searchName: 'search.php?s=',
  ingredient: 'filter.php?i=',
  category: 'filter.php?c=',
  area: 'filter.php?a=',
  name: 'search.php?s=',
  firstLetter: 'search.php?f=',
  ID: 'lookup.php?i=',
  random: 'random.php',
  listIngredient: 'list.php?i=list',
};

async function getDrinks(key, name) {
  const requestResponse = await fetch(`${URL}${ENDPOINT[key]}${name}`)
    .then((response) => response.json());
  return requestResponse;
}

export default getDrinks;
