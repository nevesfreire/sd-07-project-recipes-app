async function RequestFoodByLetter(primeiraLetra) {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${primeiraLetra}`;
  const data = await fetch(endpoint).then((response) => response.json());
  const { meals } = data;
  return meals;
}

export default RequestFoodByLetter;
