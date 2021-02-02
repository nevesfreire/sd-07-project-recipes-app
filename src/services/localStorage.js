export const saveItem = (name, data) => localStorage.setItem(name, JSON.stringify(data));

export const getItem = (name) => JSON.parse(localStorage.getItem(name));

export const initialize = () => {
  if (!getItem('user')) saveItem('user', { email: '' });
  if (!getItem('favoriteRecipes')) saveItem('favoriteRecipes', []);
  if (!getItem('doneRecipes')) saveItem('doneRecipes', []);
  if (!getItem('mealsToken')) saveItem('mealsToken', 1);
  if (!getItem('cocktailsToken')) saveItem('cocktailsToken', 1);
  const inProgressRecipes = { cocktails: {}, meals: {} };
  if (!getItem('inProgressRecipes')) saveItem('inProgressRecipes', inProgressRecipes);
};
