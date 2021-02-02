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

export { toggleFav, getFav, checkFav };
