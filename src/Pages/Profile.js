import React from 'react';
import { Link } from 'react-router-dom';
import FooterMenu from '../components/FooterMenu';
import Header from '../components/Header';

function Profile() {
  function cleanLocalStorage() {
    localStorage.clear();
  }
  return (
    <div>
      <Header title="Perfil" />
      <p data-testid="profile-email">{localStorage.getItem('user')}</p>
      <Link to="/receitas-feitas">
        <button type="button" data-testid="profile-done-btn">Receitas Feitas</button>
      </Link>
      <br />
      <Link to="/receitas-favoritas">
        <button
          type="button"
          data-testid="profile-favorite-btn"
        >
          Receitas Favoritas

        </button>
        <br />
        <Link to="/">
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ cleanLocalStorage }
          >
            Sair

          </button>
        </Link>
      </Link>
      <FooterMenu />
    </div>
  );
}

export default Profile;
