import React from 'react';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

function Header() {
  return (
    <div>
      <img src={ profileIcon } alt="profileIcon" data-testid="profile-top-btn" />
      <h2 data-testid="page-title">Título</h2>
      <img
        src={ searchIcon }
        alt="search icon"
        data-testid="search-top-btn"
      />
    </div>);
}

export default Header;
