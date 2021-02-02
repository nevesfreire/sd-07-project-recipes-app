import React from 'react';
import { Header, Footer } from '../../components';

export default function Profile() {
  const { email } = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <Header title="Perfil" />
      <h2 data-testid="profile-email">
        { email }
      </h2>
      <button type="button" data-testid="profile-done-btn">Receitas Feitas</button>
      <button type="button" data-testid="profile-favorite-btn">Receitas Favoritas</button>
      <button type="button" data-testid="profile-logout-btn">Sair</button>
      <Footer />
    </div>
  );
}
