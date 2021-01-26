const URL = 'https://www.thecocktaildb.com/api/json/v1/1/';

const ENDPOINT = {
  searchName: 'search.php?s=',
};

async function getDrink(key, name) {
  const requestResponse = await fetch(`${URL}${ENDPOINT[key]}${name}`)
    .then((response) => response.json()
      .then((data) => data.results));
  return requestResponse;
}

export default getDrink;
