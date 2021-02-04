const getFav = () => localStorage.getItem('favoriteRecipes');

const checkFav = (id) => {
  let array = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (array === null) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    array = [];
  }
  if (!array.some((r) => r.id === id)) return true;
  return false;
};

const inicializateInProgress = (type, id) => {
  const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const empity = 0;
  if (!recipesInProgress) {
    const blanckProgress = {
      cocktails: {},
      meals: {},
    };
    if (type === 'meals') blanckProgress.meals[id] = [];
    else blanckProgress.cocktails[id] = [];
    localStorage.setItem('inProgressRecipes', JSON.stringify(blanckProgress));
  } else {
    const { meals, cocktails } = recipesInProgress;
    if (Object.keys((meals).length === empity
     || meals.id === undefined) && type === 'meals') {
      meals[id] = [];
      localStorage.setItem('inProgressRecipes', JSON.stringify(recipesInProgress));
    } else if (Object.keys((cocktails).length === empity
   || cocktails.id === undefined) && type === 'cocktails') {
      cocktails[id] = [];
      localStorage.setItem('inProgressRecipes', JSON.stringify(recipesInProgress));
    }
  }
};

const toggleFav = (recipe) => {
  let array = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (array === null) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    array = [];
  }
  if (!array.some((r) => r.id === recipe.id)) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([...array, recipe]));
  } else {
    const newArray = array.filter((e) => e.id !== recipe.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newArray));
  }
};

export { toggleFav, getFav, checkFav, inicializateInProgress };
