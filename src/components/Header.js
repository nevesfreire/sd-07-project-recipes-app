import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ title, explore, funcFetch }) {
  const [searchBar, setSearchBar] = useState(false);

  return (
    <div>
      <Link to="/perfil">
        <button type="button" data-testid="profile-top-btn">
          <img src={ profileIcon } alt="profileIcon" />
        </button>
      </Link>
      <h1 data-testid="page-title">{title}</h1>
      {explore
      && <button
        type="button"
        data-testid="search-top-btn"
        onClick={ () => setSearchBar(!searchBar) }
      >
        <img
          src={ searchIcon }
          alt="search icon"
        />
      </button>}
      {searchBar && <SearchBar drinkFetch={ funcFetch } />}
    </div>);
}

export default Header;
