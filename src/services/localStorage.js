const saveDataLogin = (data) => {
  localStorage.setItem('mealsToken', JSON.stringify(1));
  localStorage.setItem('cocktailsToken', JSON.stringify(1));
  localStorage.setItem('user', JSON.stringify({ data }));
  localStorage.setItem('favoriteRecipes', JSON.stringify(data));
};

export const getRecipesDone = () => {
  const otherTest = [
    {
      id: '52771',
      type: 'comida',
      area: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '22/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'bebida',
      area: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '27/06/2020',
      tags: [],
    }];
  localStorage.setItem('doneRecipes', JSON.stringify(otherTest));
  const doneRecipesReceived = localStorage.getItem('doneRecipes');
  const doneRecipesParsed = JSON.parse(doneRecipesReceived);
  return doneRecipesParsed;
};

export const getRecipesFavorites = () => {
  const otherTest = [
    {
      id: '52771',
      type: 'comida',
      area: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '29/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'bebida',
      area: '',
      category: '',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '21/06/2020',
      tags: [],
    }];
  localStorage.setItem('favoriteRecipes', JSON.stringify(otherTest));
  const favoriteRecipesReceived = localStorage.getItem('favoriteRecipes');
  const favoriteRecipesParsed = JSON.parse(favoriteRecipesReceived);
  return favoriteRecipesParsed;
};

export default saveDataLogin;
