const INITIAL_STATE = {
  auth: {
    user: {
      email: '',
    },
  },
  recipes: {
    mealsToken: 1,
    cocktailsToken: 1,
    doneRecipes: [
      {
        type: 'meal',
        id: '123',
        name: 'meal 2',
        strThumb: 'https://www.themealdb.com/images/media/meals/vtqxtu1511784197.jpg',
      },
      {
        type: 'meal',
        id: '52784',
        name: 'Smoky Lentil Chili with Squash',
        strThumb: 'https://www.themealdb.com/images/media/meals/uwxqwy1483389553.jpg',
      },
      {
        type: 'drink',
        id: '17195',
        name: 'Bellini',
        strAlcoholic: 'Alcoholic',
        strThumb: 'https://www.thecocktaildb.com/images/media/drink/eaag491504367543.jpg',
      },

    ],
    favoriteRecipes: [
      {
        type: 'meal',
        id: '52972',
        name: 'Tunisian Lamb Soup',
        strThumb: 'https://www.themealdb.com/images/media/meals/t8mn9g1560460231.jpg',
      },
      {
        type: 'drink',
        id: '13206',
        name: 'Caipirissima',
        strAlcoholic: 'Alcoholic',
        strThumb: 'https://www.thecocktaildb.com/images/media/drink/yd47111503565515.jpg',
      },
    ],
    inProgressRecipes: {
      cocktails: {},
      meals: {},
    },
    isFetching: false,
    data: [],
    error: '',
    categories: [],
    filter: {
      type: '', // name, category, ingredient, firstLetter, area, random
      term: '', // term of search or filter
    },
  },
};

export default INITIAL_STATE;
