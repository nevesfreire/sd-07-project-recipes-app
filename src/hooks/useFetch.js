function useFetch() {
  async function foodFetch(searchWord, type) {
    const um = 1;
    if (type === 'ingredients') {
      const results = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchWord}`)
        .then((response) => response.json());
      console.log(results);
      return results;
    }
    if (type === 'name') {
      const results = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchWord}`)
        .then((response) => response.json());
      console.log(results);
      return results;
    }
    if (type === 'first-letter' && searchWord.length === um) {
      const results = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchWord}`)
        .then((response) => response.json());
      console.log(results);
      return results;
    }
  }

  async function drinkFetch(searchWord, type) {
    const um = 1;
    if (type === 'ingredients') {
      const results = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchWord}`)
        .then((response) => response.json());
      console.log(results);
      return results;
    }
    if (type === 'name') {
      const results = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchWord}`)
        .then((response) => response.json());
      console.log(results);
      return results;
    }
    if (type === 'first-letter' && searchWord.length === um) {
      const results = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchWord}`)
        .then((response) => response.json());
      console.log(results);
      return results;
    }
  }
  return (
    { foodFetch, drinkFetch }
  );
}

export default useFetch;
