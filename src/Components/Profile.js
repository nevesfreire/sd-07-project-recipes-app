import React from 'react';
import { Link } from 'react-router-dom';

function Profile() {
  const getUserEmail = () => {
    const { email } = JSON.parse(window.localStorage.getItem('user'));
    // console.log(email);
    return email;
  };

  const clearLocalStorage = () => {
    window.localStorage.clear();
  };

  return (
    <div>
      <h3 data-testid="profile-email">{ getUserEmail() }</h3>
      <Link to="/receitas-feitas">
        <button type="button" data-testid="profile-done-btn">Receitas Feitas</button>
      </Link>
      <Link to="/receitas-favoritas">
        <button type="button" data-testid="profile-favorite-btn">
          Receitas Favoritas
        </button>
      </Link>
      <Link to="/">
        <button
          onClick={ clearLocalStorage }
          type="button"
          data-testid="profile-logout-btn"
        >
          Sair
        </button>
      </Link>
    </div>
  );
}

export default Profile;
