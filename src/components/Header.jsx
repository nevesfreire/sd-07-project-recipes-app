import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import HeaderSearch from './HeaderSearch';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({name, button}) {
  const [searchBar, setSearchBar] = useState(false);

  const { pathname } = window.location;
  let title = pathname.split('/');
  title = title[title.length - 1];

  return(
    <header>
      <Link to="/perfil">
        <img
          src={ profileIcon }
          alt="profile icon"
          data-testid="profile-top-btn"
        />
      </Link>
      <h1 data-testid="page-title">{ name }</h1>
      {button && <button
        type="button"
        onClick={ () => setSearchBar(() => searchBar ? false : true) }
      >
        <img
          src={ searchIcon }
          alt="search icon"
          data-testid="search-top-btn"
        />
      </button>}
      { searchBar && <HeaderSearch />}
    </header>
  );
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  button: PropTypes.bool.isRequired,
};

export default Header;
