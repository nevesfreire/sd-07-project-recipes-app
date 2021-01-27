import React from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  return (
    <header>
      <img
        src={ profileIcon }
        alt="Imagem do profile"
        data-testid="profile-top-btn"
      />
      <title
        data-testid="page-title"
      >
        Header
      </title>
      <img
        src={ searchIcon }
        alt="Imagem do profile"
        data-testid="search-top-btn"
      />
    </header>
  );
}

export default Header;
