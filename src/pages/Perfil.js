import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Perfil() {
  const userStorage = JSON.parse(localStorage.getItem('user'));
  const emailStorage = userStorage && userStorage.email;

  return (
    <div>
      <Header />
      <h3 data-testid="profile-email">{ emailStorage }</h3>
      <Link to="/receitas-feitas">
        <Button
          type="button"
          data-testid="profile-done-btn"
          variant="secondary"
        >
          Receitas Feitas
        </Button>
      </Link>

      <Link to="/receitas-favoritas">
        <Button
          type="button"
          data-testid="profile-favorite-btn"
          variant="secondary"
        >
          Receitas Favoritas
        </Button>
      </Link>

      <Link to="/">
        <Button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => localStorage.clear() }
          variant="secondary"
        >
          Sair
        </Button>
      </Link>
      <Footer />
    </div>

  );
}

export default Perfil;
