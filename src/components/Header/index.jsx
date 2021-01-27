import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import SearchBar from '../SearchBar';

export default function Header({ history, title }) {
  const { searchBarVisible, setSearchBarVisible } = useContext(RecipesContext);
  const handleSearchBar = () => {
    setSearchBarVisible(!searchBarVisible);
  };

  const isSearchPresent = () => {
    const { location: { pathname } } = history;
    if (pathname === '/comidas'
      || pathname === '/bebidas'
      || pathname === '/explorar/comidas/area') {
      return (
        <button
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
    <header className="header">
      <Link to="/perfil">
        <img
          src={ profileIcon }
          alt="profile icon"
          data-testid="profile-top-btn"
        />
      </Link>
      <h1 data-testid="page-title">{ title }</h1>
      <div>
        { isSearchPresent() }
      </div>
      {searchBarVisible && <SearchBar />}
    </header>
  );
}

Header.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }),
  }).isRequired,
  title: PropTypes.string.isRequired,
};
