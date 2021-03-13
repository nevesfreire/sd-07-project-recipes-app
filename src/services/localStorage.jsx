export const initialize = () => {
  if (localStorage.getItem('user') === null) {
    localStorage.setItem('user', JSON.stringify({ email: '' }));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
  }
  if (localStorage.getItem('doneRecipes') === null) {
    localStorage.setItem('doneRecipes', JSON.stringify([]));
  }
  if (localStorage.getItem('favoriteRecipes') === null) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
  }
  if (localStorage.getItem('inProgressRecipes') === null) {
    const inProgressRecipes = { cocktails: {}, meals: {} };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }
};

export const saveItem = (name, data) => localStorage.setItem(name, JSON.stringify(data));

export const getItem = (name) => JSON.parse(localStorage.getItem(name));
