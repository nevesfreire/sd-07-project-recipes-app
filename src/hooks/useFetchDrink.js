function useFetchDrink() {
  async function drinkFetch(searchIngr, type) {
    console.log('chegou aqui');
    const um = 1;
    if (type === 'ingredients') {
      const results = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchIngr}`)
        .then((response) => response.json());
      console.log(results);
      return results;
    }
    if (type === 'name') {
      const results = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchIngr}`)
        .then((response) => response.json());
      console.log(results);
      return results;
    }
    if (type === 'first-letter' && searchIngr.length === um) {
      const results = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchIngr}`)
        .then((response) => response.json());
      console.log(results);
      return results;
    }
    if (type === 'first-letter' && searchIngr.length > um) {
      const messege = alert('Sua busca deve conter somente 1 (um) caracter');
      return messege;
    }
  }

  return (
    { drinkFetch }
  );
}

export default useFetchDrink;
