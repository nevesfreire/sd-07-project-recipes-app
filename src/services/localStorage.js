const removeFromFavorites = (id) => {
  const favoriteList = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const newList = favoriteList.filter((recipe) => recipe.id !== id);
  localStorage.setItem('favoriteRecipes', JSON.stringify(newList));
};

const addToFavLocalStorage = (obj) => {
  const favoriteList = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const newList = [...favoriteList, obj];
  localStorage.setItem('favoriteRecipes', JSON.stringify(newList));
};

const addToRecipesInProgress = (id, type) => {
  const progressRecipes = localStorage.getItem('inProgressRecipes');
  if (type === 'meals') {
    localStorage
      .setItem('inProgressRecipes', JSON.stringify(
        { ...JSON.parse(progressRecipes), meals: { ...progressRecipes.meals, [id]: [] } },
      ));
  } else if (type === 'cocktails') {
    localStorage
      .setItem('inProgressRecipes', JSON.stringify(
        {
          ...JSON.parse(progressRecipes),
          cocktails: { ...progressRecipes.cocktails, [id]: [] },
        },
      ));
  }
};

const addIngredient = (id, type, ingredient) => {
  const progressRecipes = localStorage.getItem('inProgressRecipes');
  console.log(progressRecipes);
  if (type === 'comidas') {
    const { meals, cocktails } = JSON.parse(progressRecipes);
    const newObject = {
      cocktails: { ...cocktails },
      meals: {
        ...meals,
        [id]: [...meals[id], ingredient],
      },
    };

    localStorage.setItem('inProgressRecipes', JSON.stringify(newObject));
  } else if (type === 'bebidas') {
    const { meals, cocktails } = JSON.parse(progressRecipes);
    const newObject = {
      meals: { ...meals },
      cocktails: {
        ...cocktails,
        [id]: [...cocktails[id], ingredient],
      },
    };

    localStorage.setItem('inProgressRecipes', JSON.stringify(newObject));
  }
};

const getIngredients = (id, type) => {
  const ingredient = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (!ingredient.meals.length && !ingredient.cocktails.length) return [];
  if (type === 'comidas') {
    return ingredient.meals[id];
  }
  if (type === 'bebidas') {
    return ingredient.cocktails[id];
  }
};

const removeFromInProgress = (id, type) => {
  const ingredient = JSON.parse(localStorage.getItem('inProgressRecipes'));

  if (type === 'comidas') {
    delete ingredient.meals[id];
    const newObject = {
      cocktails: ingredient.cocktails,
      meals: ingredient.meals,
    };

    localStorage.setItem('inProgressRecipes', JSON.stringify(newObject));
  }
  if (type === 'bebidas') {
    delete ingredient.cocktails[id];
    const newObject = {
      meals: ingredient.meals,
      cocktails: ingredient.cocktails,
    };

    localStorage.setItem('inProgressRecipes', JSON.stringify(newObject));
  }
};

const setRecipeDone = (id, type, obj) => {
  removeFromInProgress(id, type);
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  const newObject = {
    id: obj.idMeal || obj.idDrink,
    type: obj.idMeal ? 'comida' : 'bebida',
    area: obj.idMeal ? obj.strArea : '',
    category: obj.strCategory,
    alcoholicOrNot: obj.idDrink ? obj.strAlcoholic : '',
    name: obj.strMeal || obj.strDrink,
    image: obj.strMealThumb || obj.strDrinkThumb,
    tags: obj.tags ? obj.tags : [],
    doneDate: Date.now(),
  };

  localStorage.setItem('doneRecipes', JSON.stringify([...doneRecipes, newObject]));
};

const isInProgress = (idMeal, idDrink) => {
  const progressRecipes = localStorage.getItem('inProgressRecipes');

  if (idMeal) {
    return JSON.parse(progressRecipes).meals[idMeal];
  }
  if (idDrink) {
    return JSON.parse(progressRecipes).cocktails[idDrink];
  }
};

const isDone = (idMeal, idDrink) => {
  const doneRecipes = localStorage.getItem('doneRecipes');

  if (idMeal) {
    return JSON.parse(doneRecipes).some((recipe) => recipe.id === idMeal);
  }
  if (idDrink) {
    return JSON.parse(doneRecipes).some((recipe) => recipe.id === idDrink);
  }
};

export {
  removeFromFavorites,
  addToFavLocalStorage,
  addToRecipesInProgress,
  addIngredient,
  getIngredients,
  setRecipeDone,
  isDone,
  isInProgress,
};
