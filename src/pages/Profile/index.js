import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Footer, Header } from '../../components';
import { getStorage } from '../../services/localStorage';

function Profile() {
  const [user, setEmail] = useState();

  useEffect(() => {
    const localStorageEmail = getStorage('user');
    setEmail(localStorageEmail.email);
  }, [user]);

  return (
    <div>
      <Header />
      <h3 data-testid="profile-email">{user}</h3>
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
          data-testid="profile-logout-btn"
          onClick={ () => localStorage.clear() }
        >
          Sair
        </button>
      </Link>
      <Footer />
    </div>
  );
}

export default Profile;
