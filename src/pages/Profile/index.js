import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap/';
import { Header, Footer } from '../../components/index';
import { bgPerfil } from '../../images';

const Profile = () => {
  const user = localStorage.user ? JSON.parse(localStorage.user).email : '';
  const style = {
    width: '100%',
    height: '100vh',
    backgroundImage: `url(${bgPerfil})`,
  };
  return (
    <div
      className="profile-main"
      style={ style }
    >
      <Header
        title="Perfil"
        showSearchIcon={ false }
      />
      <div className="d-flex flex-column flex-xontainer  d-flex align-items-center">
        <div className="user-info">
          <h3 data-testid="profile-email">
            { user }
          </h3>
        </div>
        <div className="user-recipes">
          <Link to="/receitas-feitas">
            <Button
              variant="success"
              type="button"
              data-testid="profile-done-btn"
            >
              Receitas Feitas
            </Button>
          </Link>
        </div>
        <div>
          <Link to="/receitas-favoritas">
            <Button
              variant="warning"
              type="button"
              data-testid="profile-favorite-btn"
            >
              Receitas Favoritas
            </Button>
          </Link>
        </div>
        <div className="user-logout">
          <Link to="/">
            <Button
              variant="danger"
              type="button"
              data-testid="profile-logout-btn"
              onClick={ () => localStorage.clear() }
            >
              Sair
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
