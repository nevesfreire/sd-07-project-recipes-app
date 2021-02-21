// const END_POINT = '/api/json/v1/1/search.php?s=';

async function getDrink() {
  const result = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const data = await result.json();
  return data;
}

export default getDrink;
