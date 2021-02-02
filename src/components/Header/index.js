import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import SearchBar from '../SearchBar';
import imageProfile from '../../images/profileIcon.svg';
import imageSearch from '../../images/searchIcon.svg';
import './style.css';

function Title(pathname) {
  let title = '';
  switch (pathname) {
  case '/comidas':
    title = 'Comidas';
    break;
  case '/bebidas':
    title = 'Bebidas';
    break;
  case '/explorar':
    title = 'Explorar';
    break;
  case '/explorar/comidas':
    title = 'Explorar Comidas';
    break;
  case '/explorar/bebidas':
    title = 'Explorar Bebidas';
    break;
  case '/explorar/comidas/ingredientes':
  case '/explorar/bebidas/ingredientes':
    title = 'Explorar Ingredientes';
    break;
  case '/explorar/comidas/area':
    title = 'Explorar Origem';
    break;
  case '/perfil':
    title = 'Perfil';
    break;
  case '/receitas-feitas':
    title = 'Receitas Feitas';
    break;
  case '/receitas-favoritas':
    title = 'Receitas Favoritas';
    break;
  default:
    title = '';
  }
  return (title);
}

function Header() {
  const [enableSearch, setEnableSearch] = useState(false);
  const history = useHistory();
  const { pathname } = history.location;

  return (
    <div>
      <header className="header-container">
        <Link to="/perfil">
          <img
            src={ imageProfile }
            alt="Ir para a página de pperfil"
            data-testid="profile-top-btn"
          />
        </Link>

        <span data-testid="page-title">
          {Title(pathname)}
        </span>

        {
          (pathname === '/comidas'
          || pathname === '/bebidas'
          || pathname === '/explorar/comidas/area'
          || pathname === '/explorar/bebidas/area')
            ? (
              <button
                className="header-button"
                type="button"
                onClick={ () => setEnableSearch(!enableSearch) }
              >
                <img
                  src={ imageSearch }
                  alt="Fazer buscas"
                  data-testid="search-top-btn"
                />
              </button>
            ) : (
              <div className="header-right" />
            )
        }
      </header>
      {(enableSearch) && <SearchBar location={ pathname } />}
    </div>
  );
}

export default Header;
