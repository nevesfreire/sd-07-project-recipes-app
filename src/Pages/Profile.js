import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import FooterMenu from '../components/FooterMenu';
import Header from '../components/Header';

function Profile() {
  function cleanLocalStorage() {
    localStorage.clear();
  }

  const x = localStorage.getItem('user');
  return (
    <div>
      <Header title="Perfil" />
      <p data-testid="profile-email">{x}</p>
      <div className="profileButtons">
        <Link to="/receitas-feitas">
          <Button type="button" data-testid="profile-done-btn">Receitas Feitas</Button>
        </Link>
        <br />
        <Link to="/receitas-favoritas">
          <Button
            type="button"
            data-testid="profile-favorite-btn"
          >
            Receitas Favoritas

          </Button>
          <br />
          <Link to="/">
            <Button
              className="secondary"
              type="button"
              data-testid="profile-logout-btn"
              onClick={ cleanLocalStorage }
            >
              Sair

            </Button>
          </Link>
        </Link>
      </div>
      <FooterMenu />
    </div>
  );
}

export default Profile;
