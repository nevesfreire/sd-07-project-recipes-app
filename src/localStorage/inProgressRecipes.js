function checkProgressFoodLocalStorage(id) {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (!inProgressRecipes) {
    const recipesInProgress = {
      drinks: {},
      meals: {
        [id]: [],
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(recipesInProgress));
  } else if (inProgressRecipes && Object.keys(inProgressRecipes.meals).includes(id)) {
    const recipesInProgress = {
      ...inProgressRecipes,
      meals: {
        ...inProgressRecipes.meals,
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(recipesInProgress));
  } else if (inProgressRecipes && !Object.keys(inProgressRecipes.meals).includes(id)) {
    const recipesInProgress = {
      ...inProgressRecipes,
      meals: {
        ...inProgressRecipes.meals,
        [id]: [],
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(recipesInProgress));
  }
}

function checkProgressDrinkLocalStorage(id) {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (!inProgressRecipes) {
    const recipesInProgress = {
      drinks: {
        [id]: [],
      },
      meals: {},
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(recipesInProgress));
  } else if (inProgressRecipes && Object.keys(inProgressRecipes.drinks).includes(id)) {
    const recipesInProgress = {
      ...inProgressRecipes,
      drinks: {
        ...inProgressRecipes.drinks,
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(recipesInProgress));
  } else if (inProgressRecipes && !Object.keys(inProgressRecipes.drinks).includes(id)) {
    const recipesInProgress = {
      ...inProgressRecipes,
      drinks: {
        ...inProgressRecipes.drinks,
        [id]: [],
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(recipesInProgress));
  }
}

function setIngredientFoodLocalStorage(id, ingredient) {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  let newStructure = [...inProgressRecipes.meals[id], ingredient];
  if (inProgressRecipes.meals[id].includes(ingredient)) {
    newStructure = inProgressRecipes.meals[id]
      .filter((element) => element !== ingredient);
  }
  const newObject = {
    ...inProgressRecipes,
    meals: {
      ...inProgressRecipes.meals,
      [id]: newStructure,
    },
  };
  localStorage.setItem('inProgressRecipes', JSON.stringify(newObject));
}

function setIngredientDrinkLocalStorage(id, ingredient) {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  let newStructure = [...inProgressRecipes.drinks[id], ingredient];
  if (inProgressRecipes.drinks[id].includes(ingredient)) {
    newStructure = inProgressRecipes.drinks[id]
      .filter((element) => element !== ingredient);
  }
  const newObject = {
    ...inProgressRecipes,
    drinks: {
      ...inProgressRecipes.drinks,
      [id]: newStructure,
    },
  };
  localStorage.setItem('inProgressRecipes', JSON.stringify(newObject));
}

function checkedFoodIngredients(id, ingredient) {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const checkedElements = inProgressRecipes.meals[id];
  return checkedElements.includes(ingredient);
}

function checkedDrinkIngredients(id, ingredient) {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const checkedElements = inProgressRecipes.drinks[id];
  return checkedElements.includes(ingredient);
}

export {
  checkProgressFoodLocalStorage,
  checkProgressDrinkLocalStorage,
  setIngredientFoodLocalStorage,
  setIngredientDrinkLocalStorage,
  checkedFoodIngredients,
  checkedDrinkIngredients,
};
