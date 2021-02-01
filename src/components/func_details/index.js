export const ingredientsMount = (fn, value) => {
  const initialIndex = 0;
  const halfIndex = 2; // importante para pegar o valor das quantidades
  const ingredients = Object.entries(value.meals[0])
    // console.log(ingredients); array 2 chave e valor do retorno da API
    .filter(
      (item) => item[0].includes('Ingredient') || item[0].includes('Measure'),
    )
    // console.log(ingredients); trazendo igrediente + quantidade
    // está trazendo algumas linhas de array vazio
    .filter(
      (amount) => amount[1] !== null && amount[1] !== ' ' && amount[1] !== '',
    )
    // console.log(ingredients) todos arrays sem vazios
    .map((ar2) => ar2[1]);
  // console.log(ingredients)
  const ingredientsMeasures = [];
  for (let i = initialIndex; i < ingredients.length / halfIndex; i += 1) {
    ingredientsMeasures.push(
      `${ingredients[i]} - ${ingredients[i + ingredients.length / halfIndex]}`,
    );
  }
  // console.log(ingredientsMeasures) // concatenação de igredientes e quantidades
  fn(ingredientsMeasures);
};

export const videoMount = (fn, value) => {
  // console.log(value.meals[0].strYoutube)
  const lastIndex = value.meals[0].strYoutube.lastIndexOf('=');
  // console.log(lastIndex)
  const videoId = value.meals[0].strYoutube.slice(lastIndex + 1);
  // console.log(videoId) capturando idVideo
  const newVideoPath = `https://www.youtube.com/embed/${videoId}`;
  fn(newVideoPath);
};

export const buttonMount = (valueId) => {
  if (localStorage.getItem('doneRecipes') !== null) {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const findElement = doneRecipes.find((item) => item.id === valueId);
    if (findElement !== undefined) {
      return false;
    }
  }
  return true;
};

export const setButtonTitle = (fnSetBtnTitle, valueId) => {
  if (localStorage.getItem('inProgressRecipes') !== null) {
    const recipes = JSON.parse(localStorage.getItem('inProgressRecipes')).meals;
    const recipesIds = Object.keys(recipes);
    const findElement = recipesIds.find((recipeId) => recipeId === valueId);
    if (findElement !== undefined) {
      fnSetBtnTitle('Continuar Receita');
    }
  }
};

export const saveFavoriteRecipe = (
  valueId,
  value_RecipeArea,
  valueRecipeCategory,
  value_RecipeTitle,
  value_RecipeImage
) => {
  if (localStorage.getItem('favoriteRecipes') === null) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
  }
  const favoriteRecipes = {
    id: valueId,
    type: 'comida',
    area: value_RecipeArea,
    category: valueRecipeCategory,
    alcoholicOrNot: '',
    name: value_RecipeTitle,
    image: value_RecipeImage,
  };
  const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  recipes.push(favoriteRecipes);
  localStorage.setItem('favoriteRecipes', JSON.stringify(recipes));
};

export const setLikeImage = (
  fn_SetBtnImg,
  valueId,
  value_FullLikeIcon,
  value_LikeIcon
) => {
  if (localStorage.getItem('favoriteRecipes') !== null) {
    const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const findElement = recipes.find((item) => item.id.toString() === valueId);
    if (findElement !== undefined) {
      fn_SetBtnImg(value_FullLikeIcon);
    } else {
      fn_SetBtnImg(value_LikeIcon);
    }
  } else {
    fn_SetBtnImg(value_LikeIcon);
  }
};

export const unLikeRecipe = (valueId) => {
  const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const unSave = recipes.filter((item) => item.id !== valueId);
  localStorage.setItem('favoriteRecipes', JSON.stringify(unSave));
};

export const fetchRecommendations = async (fn_setRecommendations1, fn_setRecommendations2) => {
  const path = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const getRecipe = await fetch(path);
  const result = await getRecipe.json();
  // console.log(result) chave drinks é o interesse
  const maximumRecommendations1 = 3;
  const maximumRecommendations2 = 6;
  const getRecommendations1 = result.drinks.filter(
    (recommendation, index) => index < maximumRecommendations1 && recommendation
  );
  const getRecommendations2 = result.drinks.filter(
    (recommendation, index) =>
      index >= maximumRecommendations1 &&
      index < maximumRecommendations2 &&
      recommendation
  );
  fn_setRecommendations1(getRecommendations1);
  fn_setRecommendations2(getRecommendations2);
};
