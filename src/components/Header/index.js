import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { profileIcon, searchIcon } from '../../images';
import SearchBar from './SearchBar';

const profileButtonPaths = [
  '/comidas',
  '/bebidas',
  '/explorar/comidas/area',
  '/explorar',
  '/explorar/comidas',
  '/explorar/bebidas',
  '/explorar/comidas/ingredientes',
  '/explorar/bebidas/ingredientes',
  '/perfil',
  '/receitas-feitas',
  '/receitas-favoritas',
];

const searchButtonPaths = [
  '/comidas',
  '/bebidas',
  '/explorar/comidas/area',
];

export default function Header({ title }) {
  const history = useHistory();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const { pathname } = history.location;
  const renderProfileButton = profileButtonPaths.find((e) => e === pathname);
  const renderSearchButton = searchButtonPaths.find((e) => e === pathname);

  return (
    <div>
      <header>
        { renderProfileButton
          && (
            <button
              type="button"
              onClick={ () => history.push('/perfil') }
            >
              <img
                data-testid="profile-top-btn"
                alt="Icone de perfil"
                src={ profileIcon }
              />
            </button>

          )}
        <div data-testid="page-title">{title}</div>

        { renderSearchButton
          && (
            <button
              onClick={ () => setShowSearchBar(!showSearchBar) }
              type="button"
            >
              <img
                alt="Ícone de pesquisa"
                data-testid="search-top-btn"
                src={ searchIcon }
              />
            </button>
          )}
        { showSearchBar && <SearchBar />}
      </header>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
