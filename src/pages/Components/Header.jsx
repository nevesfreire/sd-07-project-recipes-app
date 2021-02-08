import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

function Header(props) {
  const { location, history } = props;
  const { pathname } = location;
  const [pagetitle, setPagetitle] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  useEffect(() => {
    switch (pathname) {
    case '/bebidas':
      setPagetitle('Bebidas');
      break;
    case '/comidas':
      setPagetitle('Comidas');
      break;
    case '/explorar':
      setPagetitle('Explorar');
      break;
    case '/explorar/comidas':
      setPagetitle('Explorar Comidas');
      break;
    case '/explorar/bebidas':
      setPagetitle('Explorar Bebidas');
      break;
    case '/explorar/comidas/ingredientes':
      setPagetitle('Explorar Ingredientes');
      break;
    case '/explorar/bebidas/ingredientes':
      setPagetitle('Explorar Ingredientes');
      break;
    case '/explorar/comidas/area':
      setPagetitle('Explorar Origem');
      break;
    case '/explorar/bebidas/area':
      setPagetitle('Explorar Origem');
      break;
    case '/receitas-feitas':
      setPagetitle('Receitas Feitas');
      break;
    case '/receitas-favoritas':
      setPagetitle('Receitas Favoritas');
      break;
    case '/perfil':
      setPagetitle('Perfil');
      break;
    default:
      break;
    }
  }, [pathname]);
  if (pathname === undefined) {
    return <div />;
  }
  if (pathname === '/'
  || (pathname.includes('/comidas/') && !pathname.includes('/ingredientes')
  && !pathname.includes('area'))
  || (pathname.includes('/bebidas/') && !pathname.includes('/ingredientes')
  && !pathname.includes('area'))) {
    return <div />;
  }
  let searchbttn = (
    <Button
      type="button"
      data-testid="search-top-btn"
      src={ searchIcon }
      onClick={ () => setShowSearch(!showSearch) }
    >
      <img src={ searchIcon } alt="profile icon" />
    </Button>);
  if ((pathname.includes('explorar')
  && !pathname.includes('area'))
  || pathname === '/perfil'
  || pathname === '/receitas-feitas'
  || pathname === '/receitas-favoritas') {
    searchbttn = <div />;
  }

  let searchBar = <SearchBar />;

  if (!showSearch) {
    searchBar = <div />;
  }
  return (
    <div>
      <Button
        type="button"
        data-testid="profile-top-btn"
        src={ profileIcon }
        onClick={ () => history.push('/perfil') }
      >
        <img src={ profileIcon } alt="profile icon" />
      </Button>
      <h2 data-testid="page-title">{pagetitle}</h2>
      {searchbttn}
      {searchBar}
    </div>
  );
}

Header.propTypes = {
  location: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(Header);
