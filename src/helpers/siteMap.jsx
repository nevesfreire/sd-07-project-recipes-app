const siteMap = {
  '/comidas': {
    header: {
      profileButton: true,
      searchButton: true,
      title: 'Comidas',
    },
    recipe: {
      type: 'meals',
    },
    category: {
      type: 'meals',
    },
    ingredients: {
      name: 'strIngredient',
    },
  },
  '/bebidas': {
    header: {
      profileButton: true,
      searchButton: true,
      title: 'Bebidas',
    },
    recipe: {
      type: 'drinks',
    },
    category: {
      type: 'drinks',
    },
    ingredients: {
      name: 'strIngredient1',
    },

  },
  '/explorar': {
    header: {
      profileButton: true,
      searchButton: false,
      title: 'Explorar',
    },
  },  
  '/explorar/comidas': {
    header: {
      profileButton: true,
      searchButton: false,
      title: 'Explorar Comidas',
    },
    recipeType: 'meals',
  },
  '/explorar/bebidas': {
    header: {
      profileButton: true,
      searchButton: false,
      title: 'Explorar Bebidas',
    },
    recipeType: 'drinks',
  },
  '/explorar/comidas/ingredientes': {
    header: {
      profileButton: true,
      searchButton: false,
      title: 'Explorar Ingredientes',
    },
  },
  '/explorar/bebidas/ingredientes': {
    header: {
      profileButton: true,
      searchButton: false,
      title: 'Explorar Ingredientes',
    },
  },
  '/explorar/comidas/area': {
    header: {
      profileButton: true,
      searchButton: true,
      title: 'Explorar Origem',
    },
    recipe: {
      type: 'meals',
    },
  },
  '/perfil': {
    header: {
      profileButton: true,
      searchButton: false,
      title: 'Perfil',
    },
  },
  '/receitas-feitas': {
    header: {
      profileButton: true,
      searchButton: false,
      title: 'Receitas Feitas',
    },
  },
  '/receitas-favoritas': {
    header: {
      profileButton: true,
      searchButton: false,
      title: 'Receitas Favoritas',
    },
  },
};

export default siteMap;
