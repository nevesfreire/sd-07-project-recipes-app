import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import ProfileIcon from '../../images/profileIcon.svg';
import SearchIcon from '../../images/searchIcon.svg';

function Header({ history, search = false }) {
  const { location: { pathname } } = history;

  let path = '';
  switch (pathname) {
  case '/perfil':
    path = 'Perfil';
    break;
  case '/bebidas':
    path = 'Bebidas';
    break;
  case '/comidas':
    path = 'Comidas';
    break;
  case '/explorar/bebidas':
    path = 'Explorar Bebidas';
    break;
  case '/explorar/comidas':
    path = 'Explorar Comidas';
    break;
  case '/explorar':
    path = 'Explorar';
    break;
  case '/explorar/comidas/ingredientes':
  case '/explorar/bebidas/ingredientes':
    path = 'Explorar Ingredientes';
    break;
  case '/explorar/comidas/area':
    path = 'Explorar Origem';
    break;
  case '/receitas-feitas':
    path = 'Receitas Feitas';
    break;
  case '/receitas-favoritas':
    path = 'Receitas Favoritas';
    break;
  default:
    break;
  }

  return (
    <header>
      <nav>
        <Link to="/profile">
          <img
            src={ ProfileIcon }
            alt="profile link"
            data-testid="profile-top-btn"
          />
        </Link>
        <p data-testid="page-title">{path}</p>
        {search && (
          <img
            src={ SearchIcon }
            alt="search icon"
            data-testid="search-top-btn"
          />
        )}
      </nav>
    </header>
  );
}

Header.defaultProps = { search: false };

Header.propTypes = {
  search: PropTypes.bool,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Header;
