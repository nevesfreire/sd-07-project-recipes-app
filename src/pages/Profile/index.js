import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../../components/index';

const Profile = () => {
  const user = localStorage.user ? JSON.parse(localStorage.user).email : '';
  return (
    <div>
      <Header />
      <div className="user-info">
        <h3 data-testid="profile-email">
          { user }
        </h3>
      </div>
      <div className="user-recipes">
        <Link to="/receitas-feitas">
          <button
            type="button"
            data-testid="profile-done-btn"
          >
            Receitas Feitas
          </button>
        </Link>
        <Link to="/receitas-favoritas">
          <button
            type="button"
            data-testid="profile-favorite-btn"
          >
            Receitas Favoritas
          </button>
        </Link>
      </div>
      <div className="user-logout">
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
      <Footer />
    </div>
  );
};

export default Profile;
