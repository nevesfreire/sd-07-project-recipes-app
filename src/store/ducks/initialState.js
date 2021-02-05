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
        // ver com Rafa
        strArea: 'Chinese',
        strCategory: 'Chicken',
        doneDate: '11/11/1111',
        strTags: null,
        // fim
        strThumb: 'https://www.themealdb.com/images/media/meals/vtqxtu1511784197.jpg',
      },
      {
        type: 'meal',
        id: '52784',
        name: 'Smoky Lentil Chili with Squash',
        // ver com Rafa
        strArea: 'Canadian',
        strCategory: 'Breakfast',
        doneDate: '22/22/2222',
        strTags: 'Desert,Pudding,Fruity',
        // fim
        strThumb: 'https://www.themealdb.com/images/media/meals/uwxqwy1483389553.jpg',
      },
      {
        type: 'drink',
        id: '17195',
        name: 'Bellini',
        strAlcoholic: 'Alcoholic',
        // ver com Rafa
        doneDate: '33/33/3333',
        //
        strThumb: 'https://www.thecocktaildb.com/images/media/drink/eaag491504367543.jpg',
      },

    ],
    favoriteRecipes: [
      {
        type: 'meal',
        id: '52972',
        name: 'Tunisian Lamb Soup',
        // ver com Rafa
        strArea: 'Mexican',
        strCategory: 'Vegetarian',
        doneDate: '44/44/4444',
        strTags: 'Vegetarian',
        // fim
        strThumb: 'https://www.themealdb.com/images/media/meals/t8mn9g1560460231.jpg',
      },
      {
        type: 'drink',
        id: '13206',
        name: 'Caipirissima',
        strAlcoholic: 'Alcoholic',
        // ver com Rafa
        doneDate: '55/55/5555',
        //
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
    detailsRecipe: {
      id: 0,
    },
  },
};

export default INITIAL_STATE;
