function checkProgressFoodLocalStorage(id) {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (!inProgressRecipes) {
    const recipesInProgress = {
      drinks: {},
      meals: {
        [id]: [],
      },
    };
    //    localStorage.setItem('inProgressRecipes', JSON.stringify(recipesInProgress));
    //  } else if (inProgressRecipes && !Object.keys(inProgressRecipes.meals).length) {
    //    const recipesInProgress = {
    //      ...inProgressRecipes,
    //      meals: {
    //        [id]: [],
    //      },
    //    };
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
  if (localStorage.getItem('inProgressRecipes') === null) {
    const recipesInProgress = {
      cocktails: {
        [id]: [],
      },
      meals: {},
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(recipesInProgress));
  }
}

function setIngredientLocalStorage(id, ingredient) {
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

export {
  checkProgressFoodLocalStorage,
  checkProgressDrinkLocalStorage,
  setIngredientLocalStorage,
};
