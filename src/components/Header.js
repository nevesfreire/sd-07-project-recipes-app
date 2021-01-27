import React from 'react';
import {ReactComponent as ProfileIcon} from '../images/profileIcon.svg';
import {ReactComponent as SearchIcon} from '../images/searchIcon.svg';

class Header extends React.Component {
  render() {
    <div>
      <button data-testid="profile-top-btn">
        <ProfileIcon />
      </button>
      <h1 data-testid="page-title">Título</h1>
      <button data-testid="search-top-btn">
        <SearchIcon />
      </button>
    </div>
  }
}

export default Header;