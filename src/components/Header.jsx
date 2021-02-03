import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import '../styles/header.css';
import SearchBar from './SearchBar';
import FoodAppContext from '../context/FoodAppContext';

function Header({ title, isSearchable }) {
  const { showSearch, setShowSearch } = useContext(FoodAppContext);

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
        data-testid="search-top-btn"
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
          className="profile"
          tabIndex="-1"
        >
          <img src={ profileIcon } data-testid="profile-top-btn" alt="Profile Icon" />
        </Link>
        <h1 className="title" data-testid="page-title">{title}</h1>
        {isSearchable && renderSearchIcon()}
      </header>
      { showSearch && <SearchBar title={ title } />}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  isSearchable: PropTypes.bool.isRequired,
};

export default Header;
