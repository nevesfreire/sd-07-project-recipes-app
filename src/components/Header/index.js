import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { profileIcon } from '../../images/index';
import SearchBar from '../SearchBar';

function Header(props) {
  const [propsState] = useState(props);

  const { title, showSearchBar } = propsState;

  return (
    <header>
      <nav>
        <Link to="/perfil">
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="Icone de perfil"
          />
        </Link>
        <h1
          data-testid="page-title"
        >
          { title }
        </h1>
        { showSearchBar && <SearchBar /> }
      </nav>
    </header>
  );
}

export default Header;
