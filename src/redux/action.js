function setReceitas(local) {
  return ({
    type: 'SETRECEITAS',
    value: local,
  });
}

function despacho(object, value) {
  return ({
    type: 'LOADRECIPES',
    object,
    value,
  });
}

function loadRecipes(local) {
  return async (dispatch) => {
    let url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    if (local === 'comidas') {
      url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    }
    const response = await fetch(url);
    const responsejeson = await response.json();
    dispatch(despacho(responsejeson, local));
  };
}

export { loadRecipes, setReceitas };
