import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../Footer';
import { getStorage } from '../../services/localStorage';
import './style.css';

export default function Profile() {
  const email = getStorage('user') && getStorage('user').email;

  const history = useHistory();

  const setLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header title="Perfil" />
      <section className="container-profile">
        <div className="hr"></div>
        <p data-testid="profile-email">
          { email }
        </p>
        <Button
          sixe="lg"
          block
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/receitas-feitas') }
        >
          Receitas Feitas
        </Button>

        <Button
          sixe="lg"
          block
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/receitas-favoritas') }
        >
          Receitas Favoritas
        </Button>

        <Button
          sixe="lg"
          block
          type="button"
          data-testid="profile-logout-btn"
          onClick={ setLogout }
        >
          Sair
        </Button>

      </section>
      <Footer />
    </div>
  );
}
