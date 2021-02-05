import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../../components';
import './Profile.css';

export default function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="profile-container">
      <Header title="Perfil" />
      <div className="profile-content">
        <h2 data-testid="profile-email">
          { user ? user.email : '' }
        </h2>
        <Link
          to="/receitas-feitas"
          data-testid="profile-done-btn"
        >
          Receitas Feitas
        </Link>
        <br />
        <Link
          to="/receitas-favoritas"
          data-testid="profile-favorite-btn"
        >
          Receitas Favoritas
        </Link>
        <br />
        <Link
          to="/"
          data-testid="profile-logout-btn"
          onClick={ () => localStorage.clear() }
        >
          Sair
        </Link>
      </div>
      <Footer />
    </div>
  );
}
