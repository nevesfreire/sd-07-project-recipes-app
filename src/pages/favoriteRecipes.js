import React, { } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';

function FavoriteRecipes() {
  return (
    <div>
      <header>
        <Link to="/perfil">
          <img
            src={ profileIcon }
            alt="profile icon"
            data-testid="profile-top-btn"
          />
        </Link>
        <h1 data-testid="page-title">Receitas Favoritas</h1>
      </header>
    </div>
  );
}

export default FavoriteRecipes;
