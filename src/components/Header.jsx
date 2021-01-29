import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchHeader from './SearchHeader';
import GlobalContext from '../context/GlobalContext';

function Header() {
  const {
    title,
    searchButton,
    searchBar,
    setSearchBar,
  } = useContext(GlobalContext);
  console.log(searchButton);

  const handleClick = () => {
    if (searchBar) {
      setSearchBar(false);
    } else {
      setSearchBar(true);
    }
  };

  const handlerSearchBtn = () => (
    <button type="button" onClick={ () => handleClick() }>
      <img src={ searchIcon } data-testid="search-top-btn" alt="Search Icon" />
    </button>
  );

  return (
    <header className="header">
      <Link to="/perfil">
        <img
          src={ profileIcon }
          data-testid="profile-top-btn"
          alt="Profile Icon"
        />
      </Link>

      <h1 data-testid="page-title">{title}</h1>
      {searchButton && handlerSearchBtn()}

      {searchBar && <SearchHeader />}
    </header>
  );
}

export default Header;
