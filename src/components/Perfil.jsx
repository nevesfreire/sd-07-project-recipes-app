import React from 'react';
import { Link } from 'react-router-dom';

function Perfil() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <h2 data-testid="profile-email">
        { user.email }
      </h2>
      <button type="button">
        <Link
          to="/receitas-feitas"
          data-testid="profile-done-btn"
        >
          Receitas Feitas
        </Link>
      </button>
      <button type="button">
        <Link
          to="/receitas-favoritas"
          data-testid="profile-favorite-btn"
        >
          Receitas Favoritas
        </Link>
      </button>
      <button type="button">
        <Link
          to="/"
          data-testid="profile-logout-btn"
          onClick={ () => localStorage.clear() }
        >
          Sair
        </Link>
      </button>
    </div>
  );
}

export default Perfil;
