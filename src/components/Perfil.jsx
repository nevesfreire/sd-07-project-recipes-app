import React from 'react';
import { Link } from 'react-router-dom';

function Perfil() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="content-perfil">
      <h2 data-testid="profile-email">
        { user ? user.email : '' }
      </h2>
      <Link
        to="/receitas-feitas"
        data-testid="profile-done-btn"
      >
        Receitas Feitas
      </Link>

      <Link
        to="/receitas-favoritas"
        data-testid="profile-favorite-btn"
      >
        Receitas Favoritas
      </Link>

      <Link
        to="/"
        data-testid="profile-logout-btn"
        onClick={ () => localStorage.clear() }
      >
        Sair
      </Link>

    </div>
  );
}

export default Perfil;
