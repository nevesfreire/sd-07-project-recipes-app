import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import SearchBar from '../SearchBar';
import imageProfile from '../../images/profileIcon.svg';
import imageSearch from '../../images/searchIcon.svg';
import './style.css';

export default function Header() {
  const [enableSearch, setEnableSearch] = useState(false);
  const history = useHistory();
  const { pathname } = history.location;
  return (
    <header className="header-container">
      <Link
        to="/perfil"
        data-testid="profile-top-btn"
      >
        <img src={ imageProfile } alt="profile" />
      </Link>

      <span data-testid="page-title">Titulo Variável</span>
      {
        (pathname === '/comidas'
          || pathname === '/bebidas'
          || pathname === '/explorar/comidas/area'
          || pathname === '/explorar/bebidas/area')
          ? (
            <button
              className="header-button"
              type="button"
              data-testid="search-top-btn"
              onClick={ () => setEnableSearch(!enableSearch) }
            >
              <img src={ imageSearch } alt="" />
            </button>
          ) : (
            <div className="header-right" />
          )
      }
      { enableSearch && (<SearchBar />) }
    </header>
  );
}
