const getFav = () => localStorage.getItem('favoriteRecipes');

const desFav = (data, setData, id) => {
  const newData = data.filter((e) => e.id !== id);
  setData(newData);
  localStorage.setItem('favoriteRecipes', JSON.stringify(newData));
};

const checkFav = (id) => {
  let arrayy = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (arrayy === null) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    arrayy = [];
  }
  if (!arrayy.some((r) => r.id === id)) return true;
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

export { toggleFav, getFav, checkFav, desFav };
