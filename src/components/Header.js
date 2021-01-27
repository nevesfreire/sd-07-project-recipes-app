import React from 'react';
import ProfileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

class Header extends React.Component {
  render() {
    return(
      <div>
      <button type="button">
        <img
          data-testid="profile-top-btn"
          src={ProfileIcon} alt="profile icon"
        />
      </button>
      <h1 data-testid="page-title">Título</h1>
      <button type="button">
        <img
          data-testid="search-top-btn"
          src={searchIcon} alt="search icon"
        />
      </button>
    </div>
    )
  }
}

export default Header;