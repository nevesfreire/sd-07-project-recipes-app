const siteMap = {
  comidas: {
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
  bebidas: {
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
  explorar: {
    header: {
      profileButton: true,
      searchButton: false,
      title: 'Explorar',
    },
  },
  explorarBebidas: {
    header: {
      profileButton: true,
      searchButton: false,
      title: 'Explorar Bebidas',
    },
    recipeType: 'drinks',
  },
  explorarComidas: {
    header: {
      profileButton: true,
      searchButton: false,
      title: 'Explorar Comidas',
    },
    recipeType: 'meals',
  },
  explorarComidasIngredientes: {
    header: {
      profileButton: true,
      searchButton: false,
      title: 'Explorar Ingredientes',
    },
  },
  explorarBebidasIngredientes: {
    header: {
      profileButton: true,
      searchButton: false,
      title: 'Explorar Ingredientes',
    },
  },
  explorarComidasLocalOrigem: {
    header: {
      profileButton: true,
      searchButton: true,
      title: 'Explorar Origem',
    },
    recipe: {
      type: 'meals',
    },
  },
  perfil: {
    header: {
      profileButton: true,
      searchButton: false,
      title: 'Perfil',
    },
  },
  receitasFavoritas: {
    header: {
      profileButton: true,
      searchButton: false,
      title: 'Receitas Favoritas',
    },
  },
  receitasFeitas: {
    header: {
      profileButton: true,
      searchButton: false,
      title: 'Receitas Feitas',
    },
  },
};

export default siteMap;
