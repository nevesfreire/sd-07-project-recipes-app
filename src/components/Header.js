import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import profileIcon from '../images/profileIcon.svg';

function Header() {
  const {
    titleByUrl,
    handleUrlChange,
  } = useContext(RecipesContext);

  return (
    <header>
      <Link to="/perfil">
        <button
          type="button"
          onClick={ handleUrlChange() }
        >
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="profile-icon"
          />
        </button>
      </Link>
      <h2 data-testid="page-title">{ titleByUrl() }</h2>
    </header>
  );
}

export default Header;
