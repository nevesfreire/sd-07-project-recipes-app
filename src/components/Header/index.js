import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
// import PropTypes from 'prop-types';
import { profileIcon, searchIcon } from '../../images';
import SearchBar from './SearchBar';
import RecipesContext from '../../Context/RecipesContext';

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

export default function Header() {
  const history = useHistory();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const { pageTitle } = useContext(RecipesContext);
  // console.log('titulo: ', pageTitle)
  const { pathname } = history.location;
  // console.log(pathname);
  // console.log(profileButtonPaths[0])
  // console.log(pathname === profileButtonPaths[0])
  const renderProfileButton = profileButtonPaths.find((e) => e === pathname);
  const renderSearchButton = searchButtonPaths.find((e) => e === pathname);

  return (
    <div>
      { renderProfileButton
        && (
          <button
            data-testid="profile-top-btn"
            src="/perfil"
            type="button"
            onClick={ () => history.push('/perfil') }
          >
            <img alt="Icone de perfil" src={ profileIcon } />
          </button>

        )}

      {/* <Link
            to="/perfil"
          >
            <button
              data-testid="profile-top-btn"
              type="button"
            >
              <img alt="Icone de perfil" src={ profileIcon } />
            </button>
          </Link> */}

      <div data-testid="page-title">{pageTitle}</div>

      { renderSearchButton
        && (
          <button
            data-testid="search-top-btn"
            onClick={ () => setShowSearchBar(!showSearchBar) }
            type="button"
          >
            <img alt="Ícone de pesquisa" src={ searchIcon } />
          </button>
        )}

      { showSearchBar && <SearchBar />}
    </div>
  );
}

// Header.propTypes = {
//   pageTitle: PropTypes.string.isRequired,
// };
