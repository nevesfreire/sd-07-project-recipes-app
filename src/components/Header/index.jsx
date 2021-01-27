import React from 'react';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

export default function Header() {
  return (
    <div>
      <div>
        <img
          src={ profileIcon }
          alt="profile icon"
          data-testid="profile-top-btn"
        />
      </div>
      <h1 data-testid="page-title">Title</h1>
      <div>
        <img
          src={ searchIcon }
          alt="search icon"
          data-testid="search-top-btn"
        />
      </div>
    </div>
  );
}
