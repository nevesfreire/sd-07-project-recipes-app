function setReceitas(local) {
  return ({
    type: 'SETRECEITAS',
    value: local,
  });
}

function despachoReceitas(object) {
  return ({
    type: 'LOADRECIPES',
    object,
  });
}

function despachoReceitas2(object) {
  return ({
    type: 'LOADRECIPES2',
    object,
  });
}

function despachoCategorias(array) {
  return ({
    type: 'GETCATEGORIES',
    array,
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
    dispatch(despachoReceitas(responsejeson));
  };
}

function loadRecipesIngredent(ingredient, local) {
  return async (dispatch) => {
    let url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
    if (local === 'comidas') {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
    }
    const response = await fetch(url);
    const responsejeson = await response.json();
    dispatch(despachoReceitas2(responsejeson));
  };
}

function loadCategories(local) {
  return async (dispatch) => {
    let tipo = 'drinks';
    let url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    if (local === 'comidas') {
      tipo = 'meals';
      url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    }
    const response = await fetch(url);
    const responsejeson = await response.json();
    const inic = 0;
    const end = 5;
    const categories = responsejeson[(tipo)].slice(inic, end);
    dispatch(despachoCategorias(categories));
  };
}

function setFilterRecipes(local) {
  return ({
    type: 'SETFILTERRECIPES',
    value: local,
  });
}

export {
  loadRecipes,
  setReceitas,
  loadCategories,
  setFilterRecipes,
  loadRecipesIngredent,
};
