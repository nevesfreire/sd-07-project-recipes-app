import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Perfil() {

  const handleLocalStorageOnLogout = () => {
    if(localStorage) localStorage.clear();
  };

  const userEmail = JSON.parse(localStorage.user).email;
  
  return (
    <div>
      <Header name="Perfil" button={ false } />
        <h4 data-testid="profile-email">
          {userEmail}
        </h4>
        <Link to="/receitas-feitas">
        <button
         data-testid="profile-done-btn"
         type="button"
        >
          Receitas Feitas
        </button>
        </Link>
        <Link to="/receitas-favoritas">
          <button
          data-testid="profile-favorite-btn"
          type="button"
          >
            Receitas Favoritas
          </button>
        </Link>
        <Link to="/">
          <button
          data-testid="profile-logout-btn"
          type="button"
          onClick={ handleLocalStorageOnLogout }
          >
            Sair
          </button>
        </Link>
      <Footer />
    </div>
  );
}

export default Perfil;
