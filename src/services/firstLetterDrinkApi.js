async function RequestDrinkByLetter(primeiraLetra) {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${primeiraLetra}`;
  const data = await fetch(endpoint).then((response) => response.json());
  const { drinks } = data;
  return drinks;
}

export default RequestDrinkByLetter;
