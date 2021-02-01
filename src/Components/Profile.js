import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Profile() {
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const profileEmail = window.localStorage.getItem('user');
    if (profileEmail) {
      const { email } = JSON.parse(profileEmail);
      setUserEmail(email);
    }
  }, [  ]);

  const clearLocalStorage = () => {
    window.localStorage.clear();
  };

  return (
    <div>
      <h3 data-testid="profile-email">{ userEmail }</h3>
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
