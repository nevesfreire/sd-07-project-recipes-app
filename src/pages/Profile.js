import React from 'react';
import { Link } from 'react-router-dom';

function Profile() {
  const { email } = JSON.parse(localStorage.getItem('user'));
  return (
    <div>
      <h2 data-testid="profile-email">{email}</h2>
      <Link to="/receitas-feitas">
        <button type="button" data-testid="profile-done-btn">Receitas Feitas</button>
      </Link>
      <Link to="/receitas-favoritas">
        <button
          type="button"
          data-testid="profile-favorite-btn"
        >
          Receitas Favoritas
        </button>
      </Link>
      <Link to="/">
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => localStorage.clear() }
        >
          Sair
        </button>
      </Link>
    </div>
  );
}

export default Profile;
