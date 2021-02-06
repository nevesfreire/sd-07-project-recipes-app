import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../Footer';
import { getStorage } from '../../services/localStorage';

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
      <section>
        <p data-testid="profile-email">
          { email }
        </p>

        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/receitas-feitas') }
        >
          Receitas Feitas
        </button>

        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/receitas-favoritas') }
        >
          Receitas Favoritas
        </button>

        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ setLogout }
        >
          Sair
        </button>

      </section>
      <Footer />
    </div>
  );
}
