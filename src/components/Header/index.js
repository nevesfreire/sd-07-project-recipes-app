import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchBar from '../SearchBar';
import ProfileIcon from '../../images/profileIcon.svg';
import SearchIcon from '../../images/searchIcon.svg';
import FavoriteRecipes from '../../pages/FavoritesRecipes';
import './style.css';

function Header({ history, search = false }) {
  const { location: { pathname } } = history;
  const [searchInput, setSearchInput] = useState(false);

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
    <header className="header">
      <nav className="header__nav">
        <Link to="/perfil">
          <img
            src={ ProfileIcon }
            alt="profile link"
            data-testid="profile-top-btn"
          />
        </Link>
        <h4 data-testid="page-title">{path}</h4>
        {path === 'Receitas Favoritas' ? <FavoriteRecipes /> : null}
        {search
          ? (
            <button
              type="button"
              onClick={ () => setSearchInput((prev) => !prev) }
            >
              <img
                src={ SearchIcon }
                alt="search icon"
                data-testid="search-top-btn"
              />
            </button>
          )
          : <div />}
      </nav>
      {searchInput && (
        <SearchBar history={ history } />
      )}
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
