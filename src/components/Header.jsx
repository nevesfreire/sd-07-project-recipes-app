import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import './Header.css';

function Header({ title, isSearchable }) {
  const [showSearch, setShowSearch] = useState(false);

  const handleSearchClick = () => {
    setShowSearch(!showSearch);
  };

  const renderSearchIcon = () => (
    <div
      onClick={ handleSearchClick }
      role="button"
      tabIndex="-1"
      onKeyDown={ handleSearchClick }
      className="search"
    >
      <img
        src={ searchIcon }
        alt="Search Icon"
      />
    </div>
  );

  return (
    <div>
      <header>
        <Link
          to="/perfil"
          data-testid="profile-top-btn"
          className="profile"
          tabIndex="-1"
        >
          <img src={ profileIcon } alt="Profile Icon" />
        </Link>
        <h1 className="title" data-test-id="page-title">{ title }</h1>
        { isSearchable && renderSearchIcon() }
      </header>
      { showSearch && 'mostra a barra de busca'}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  isSearchable: PropTypes.bool.isRequired,
};

export default Header;
