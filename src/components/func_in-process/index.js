export const ingredientsMount = (fnSetRecipeIngredients, result) => {
  const initialIndex = 0;
  const halfIndex = 2;
  const ingredients = Object.entries(result.drinks[0])
    .filter((item) => item[0].includes('Ingredient') || item[0].includes('Measure'))
    .filter((ar) => ar[1] !== null && ar[1] !== ' ' && ar[1] !== '')
    .map((ar2) => ar2[1]);
  const ingredientsMeasures = [];
  for (let i = initialIndex; i < ingredients.length / halfIndex; i += 1) {
    ingredientsMeasures
      .push(`${ingredients[i]} - ${ingredients[i + ingredients.length / halfIndex]}`);
  }
  fnSetRecipeIngredients(ingredientsMeasures);
};

export const saveProgress = (fnSetInProgressRecipes, ingredient, valueId) => {
  const previousProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));

  if (previousProgress.cocktails[valueId]) {
    if (previousProgress.cocktails[valueId].includes(ingredient)) {
      previousProgress.cocktails[valueId] = previousProgress.cocktails[valueId]
        .filter((item) => item !== ingredient);
    } else {
      previousProgress.cocktails[valueId].push(ingredient);
    }
  } else {
    previousProgress.cocktails[valueId] = [ingredient];
  }
  localStorage.setItem('inProgressRecipes', JSON.stringify(previousProgress));
  fnSetInProgressRecipes(previousProgress);
};

export const handleCheckedFromLocalStorage = (item, valueId) => {
  if (localStorage.getItem('inProgressRecipes')) {
    const previousLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    return previousLocalStorage.cocktails[valueId]
      .find((currentItem) => currentItem === item);
  }
  return false;
};

export const handleClass = (item, valueId) => {
  if (localStorage.getItem('inProgressRecipes')) {
    const previousLocalStorage = JSON
      .parse(localStorage.getItem('inProgressRecipes'));
    const isThere = previousLocalStorage.cocktails[valueId]
      .find((currentItem) => currentItem === item);
    if (isThere) {
      return 'is-checked';
    }
  }
  return 'is-not-checked';
};

export const unLikeRecipe = (valueId) => {
  const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const unSave = recipes.filter((item) => item.id !== valueId);
  localStorage.setItem('favoriteRecipes', JSON.stringify(unSave));
};

export const handleFinishRecipe = (ingredientsLength, valueId) => {
  if (JSON.parse(localStorage.getItem('inProgressRecipes'))) {
    const ingredientsInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (ingredientsLength === ingredientsInProgress.cocktails[valueId].length) {
      return false;
    }
    return true;
  }
};

export const dateFormat = () => {
  const monthCorrection = 1;
  const twoDecimalPlaces = 10;
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + monthCorrection;
  const year = date.getFullYear();

  let formatterDay;
  if (day < twoDecimalPlaces) {
    formatterDay = `0${day}`;
  } else {
    formatterDay = day;
  }

  let formatterMonth;
  if (month < twoDecimalPlaces) {
    formatterMonth = `0${month}`;
  } else {
    formatterMonth = month;
  }

  return `${formatterDay}/${formatterMonth}/${year}`;
};
