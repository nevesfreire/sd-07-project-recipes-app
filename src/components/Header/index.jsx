import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory, Link } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import SearchBar from '../SearchBar';
import LogoFlat from '../../images/ByeByeMiojo-logo-hor.png';

export default function Header({ title }) {
  const { searchBarVisible, setSearchBarVisible } = useContext(RecipesContext);
  const handleSearchBar = () => {
    setSearchBarVisible(!searchBarVisible);
  };
  const { location } = useHistory();

  const isSearchPresent = () => {
    const { pathname } = location;
    if (pathname === '/comidas'
      || pathname === '/bebidas'
      || pathname === '/explorar/comidas/area') {
      return (
        <button
          className="search-button-header"
          type="button"
          onClick={ handleSearchBar }
        >
          <img
            src={ searchIcon }
            alt="search icon"
            data-testid="search-top-btn"
          />
        </button>
      );
    }
    return '';
  };
  return (
    <div>
      <header className="header">
        <div>
          <Link to="/perfil">
            <img
              src={ profileIcon }
              alt="profile icon"
              data-testid="profile-top-btn"
            />
          </Link>
        </div>
        <div>

          <div className="logo-flat">
            <img
              src={ LogoFlat }
              alt="logo site"
            />
          </div>
          <h1
            data-testid="page-title"
          >
            { title }
          </h1>
        </div>
        <div>
          { isSearchPresent() }
        </div>
      </header>
      { searchBarVisible && <SearchBar /> }
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
