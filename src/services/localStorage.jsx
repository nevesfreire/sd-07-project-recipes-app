export const initialize = () => {
  if (localStorage.getItem('user') === null) {
    localStorage.setItem('user', JSON.stringify({ email: '' }));
    localStorage.setItem('doneRecipes', JSON.stringify([]));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    const inProgressRecipes = { cocktails: {}, meals: {} };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }
  if (localStorage.getItem('favoriteRecipes') === null) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
  }
};

export const saveItem = (name, data) => localStorage.setItem(name, JSON.stringify(data));

export const getItem = (name) => JSON.parse(localStorage.getItem(name));
