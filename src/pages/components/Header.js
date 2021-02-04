import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import HeaderSearchBar from './HeaderSearchBar';
import '../../css/header.css';

function Header(props) {
  const { headerText, showSearchButton } = props;
  const [searchBar, setSearchBar] = useState(false);
  return (
    <div className="header-content">
      <a
        type="button"
        data-testid="profile-top-btn"
        src={ profileIcon }
        to="/perfil"
      >
        <img src={ profileIcon } alt="Profile icon" />
      </a>
      <h1 data-testid="page-title">{ headerText }</h1>
      <div className="item-search">
        {searchBar && (
          <HeaderSearchBar headerText={ headerText } />
        )}
        {JSON.parse(showSearchButton) && (
          <button
            className="search-top-btn"
            type="button"
            data-testid="search-top-btn"
            src={ searchIcon }
            onClick={ () => setSearchBar(!searchBar) }
          >
            <img src={ searchIcon } alt="Search icon" />
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;

Header.propTypes = {
  headerText: PropTypes.string.isRequired,
  showSearchButton: PropTypes.string.isRequired,
};
