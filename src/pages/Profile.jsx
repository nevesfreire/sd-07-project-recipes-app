import React from 'react';
import { Link } from 'react-router-dom';

import Footer from '../components/Footer';

function Profile() {
  const eraseLocalStorage = () => {
    localStorage.clear();
  };

  const profileElements = () => {
    // const { email } = JSON.parse(localStorage.getItem('user'));
    const email = '';

    return (
      <div>
        <h3 data-testid="profile-email">{ email }</h3>
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
        <Link to="/">
          <button
            type="button"
            onClick={ () => eraseLocalStorage() }
            data-testid="profile-logout-btn"
          >
            Sair
          </button>
        </Link>
        <Footer />
      </div>
    );
  };

  return (profileElements());
}

export default Profile;
