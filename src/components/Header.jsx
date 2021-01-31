import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchHeader from './SearchHeader';
import GlobalContext from '../context/GlobalContext';
import './style/Header.css';

function Header() {
  const {
    title,
    searchButton,
    searchBar,
    setSearchBar,
  } = useContext(GlobalContext);

  const handleClick = () => {
    if (searchBar) {
      setSearchBar(false);
    } else {
      setSearchBar(true);
    }
  };

  const handlerSearchBtn = () => (
    <button
      className="header-btn"
      type="button"
      onClick={ () => handleClick() }
    >
      <img className="header-search-icon" src={ searchIcon } data-testid="search-top-btn" alt="Search Icon" />
    </button>
  );

  return (
    <header className="header-container">
      <div className="header-info-display">
        <Link to="/perfil">
          <img
            src={ profileIcon }
            data-testid="profile-top-btn"
            alt="Profile Icon"
          />
        </Link>

        <h1 data-testid="page-title">{title}</h1>
      </div>

      <div className="header-search-container">
        {searchButton && handlerSearchBtn()}
        {searchBar && <SearchHeader />}
      </div>
    </header>
  );
}

export default Header;
