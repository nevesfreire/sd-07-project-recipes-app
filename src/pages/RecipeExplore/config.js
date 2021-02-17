export default function configExplore(path) {
  switch (path) {
  case '/explorar':
    return {
      title: 'Eplorar',
      options: [
        { link: '/explorar/comidas',
          dataTestId: 'explore-food',
          text: 'Explorar Comidas' },
        { link: '/explorar/bebidas',
          dataTestId: 'explore-drinks',
          text: 'Explorar Bebidas' },
      ],
    };
  case '/explorar/comidas':
    return {
      title: 'Explorar Comidas',
      options: [
        { link: '/explorar/comidas/ingredientes',
          dataTestId: 'explore-by-ingredient',
          text: 'Por Ingredientes' },
        { link: '/explorar/comidas/area',
          dataTestId: 'explore-by-area',
          text: 'Por Local de Origem' },
        { link: '/comidas/',
          dataTestId: 'explore-surprise',
          text: 'Me Surpreenda!' },
      ],
    };
  case '/explorar/bebidas':
    return {
      title: 'Explorar Bebidas',
      options: [
        { link: '/explorar/bebidas/ingredientes',
          dataTestId: 'explore-by-ingredient',
          text: 'Por Ingredientes' },
        { link: '/bebidas/',
          dataTestId: 'explore-surprise',
          text: 'Me Surpreenda!' },
      ],
    };
  default:
    return {};
  }
}
