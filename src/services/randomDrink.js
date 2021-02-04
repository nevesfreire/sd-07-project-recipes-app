async function RequestRandomDrink() {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  const data = await fetch(endpoint).then((response) => response.json());
  const { drinks } = data;
  return drinks[0].idDrink;
}

export default RequestRandomDrink;
