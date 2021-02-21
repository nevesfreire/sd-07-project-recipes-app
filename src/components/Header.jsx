import PropTypes from 'prop-types';
import HeaderconditionalOne from '../helpers/HeaderconditionalOne';
import HeaderconditionalTwo from '../helpers/HeaderconditionalTwo';
import HeaderconditionalThree from '../helpers/HeaderconditionalThree';

function Header({ pathName }) {
  const { location: { pathname } } = pathName;

  const titlesOne = {
    explorar: '/explorar',
    comidas: '/comidas',
    bebidas: '/bebidas',
    perfil: '/perfil',
  };

  const titlestwo = {
    explorarComida: '/explorar/comidas',
    explorarBebida: '/explorar/bebidas',
    explorarComidaOrigem: '/explorar/comidas/area',
  };

  const titlesthree = {
    explorarComidaIngredientes: '/explorar/comidas/ingredientes',
    explorarBebidaIngredientes: '/explorar/bebidas/ingredientes',
  };

  if (
    pathname === '/explorar'
    || pathname === '/comidas'
    || pathname === '/bebidas'
    || pathname === '/perfil'
  ) {
    return HeaderconditionalOne(pathname, titlesOne);
  }

  if (pathname === '/explorar/comidas'
     || pathname === '/explorar/bebidas'
     || pathname === '/explorar/comidas/area') {
    return HeaderconditionalTwo(pathname, titlestwo);
  }

  if (
    pathname === '/explorar/comidas/ingredientes'
    || pathname === '/explorar/bebidas/ingredientes'
  ) {
    return HeaderconditionalThree(pathname, titlesthree);
  }
}

Header.propTypes = {
  pathName: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Header;
