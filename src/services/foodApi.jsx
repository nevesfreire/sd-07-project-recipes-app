async function getFood() {
  const result = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const data = await result.json();
  return data;
}

export default getFood;
