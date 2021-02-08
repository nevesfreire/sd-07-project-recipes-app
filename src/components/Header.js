import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ title, explore, funcFetch }) {
  const [searchBar, setSearchBar] = useState(false);

  function resolveProblem() {
    return (
      <button
        type="button"
        data-testid="search-top-btn"
        onClick={ () => setSearchBar(!searchBar) }
      >
        <img
          src={ searchIcon }
          alt="search icon"
        />
      </button>);
  }

  return (
    <div className="header">
      <Link to="/perfil">
        <button type="button" data-testid="profile-top-btn">
          <img src={ profileIcon } alt="profileIcon" />
        </button>
      </Link>
      <h1 data-testid="page-title" className="header">{title}</h1>
      {explore && resolveProblem()}

      {searchBar && <SearchBar theFetch={ funcFetch } />}
    </div>);
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  explore: PropTypes.bool.isRequired,
  funcFetch: PropTypes.func.isRequired,
};

export default Header;
