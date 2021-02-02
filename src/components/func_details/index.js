export const ingredientsMount = (fn, value) => {
  const initialIndex = 0;
  const halfIndex = 2; // importante para pegar o valor das quantidades
  const ingredients = Object.entries(value.meals[0])
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

export function saveFavoriteRecipe(
  valueObject,
  // valueId,
  // valueRecipeArea,
  // valueRecipeCategory,
  // valueRecipeTitle,
  // valueRecipeImage,
) {
  const {
    id,
    getRecipeTitle,
    getRecipeImage,
    getRecipeCategory,
    getRecipeArea,
  } = valueObject;

  if (localStorage.getItem('favoriteRecipes') === null) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
  }
  const favoriteRecipes = {
    id,
    type: 'comida',
    area: getRecipeArea,
    category: getRecipeCategory,
    alcoholicOrNot: '',
    name: getRecipeTitle,
    image: getRecipeImage,
  };
  const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  recipes.push(favoriteRecipes);
  localStorage.setItem('favoriteRecipes', JSON.stringify(recipes));
}

export const setLikeImage = (
  fnSetBtnImg,
  valueId,
  valueFullLikeIcon,
  valueLikeIcon,
) => {
  if (localStorage.getItem('favoriteRecipes') !== null) {
    const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const findElement = recipes.find((item) => item.id === valueId);
    if (findElement !== undefined) {
      fnSetBtnImg(valueFullLikeIcon);
    } else {
      fnSetBtnImg(valueLikeIcon);
    }
  } else {
    fnSetBtnImg(valueLikeIcon);
  }
};

export const unLikeRecipe = (valueId) => {
  const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const unSave = recipes.filter((item) => item.id !== valueId);
  localStorage.setItem('favoriteRecipes', JSON.stringify(unSave));
};

export const fetchRecommendations = async (
  fnSetRecommendations1, fnSetRecommendations2) => {
  const path = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const getRecipe = await fetch(path);
  const result = await getRecipe.json();
  // console.log(result) // chave drinks é o interesse Array(25)
  const maximumRecommendations1 = 3;
  const maximumRecommendations2 = 6;
  const getRecommendations1 = result.drinks.filter(
    (recommendation, index) => index < maximumRecommendations1 && recommendation,
  );
  // console.log(getRecommendations1) //array 3 objetos ok
  const getRecommendations2 = result.drinks.filter(
    (recommendation, index) => index >= maximumRecommendations1
    && index < maximumRecommendations2
    && recommendation,
  );
  // console.log(getRecommendations2) array 3 objetos ok
  fnSetRecommendations1(getRecommendations1);
  fnSetRecommendations2(getRecommendations2);
};


export const fetchRecommendationsMeals = async (
  fnSetRecommendations1,
  fnSetRecommendations2) => {
  const path = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(path);
  const result = await response.json();
  // console.log(result);
  const maximumRecommendations1 = 3;
  const maximumRecommendations2 = 6;
  const getRecommendations1 = result.meals.filter(
    (recommendation, index) => index < maximumRecommendations1
      && recommendation,
  );
  // console.log(getRecommendations1);
  const getRecommendations2 = result.meals.filter(
    (recommendation, index) => index >= maximumRecommendations1
    && index < maximumRecommendations2
    && recommendation,
  );
  fnSetRecommendations1(getRecommendations1);
  fnSetRecommendations2(getRecommendations2);
}