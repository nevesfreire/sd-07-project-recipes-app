import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

function Perfil() {
  const { email } = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <span data-testid="profile-email">{ email }</span>
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
