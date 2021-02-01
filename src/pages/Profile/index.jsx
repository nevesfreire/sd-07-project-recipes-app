import React, { useContext } from 'react';
import { Header, Footer } from '../../components';
import { RecipesContext } from '../../context';

export default function Profile() {
  const { login } = useContext(RecipesContext);

  return (
    <div>
      <Header title="Perfil" />
      <h2 data-testid="profile-email">
        Email:
        { login.email }
      </h2>
      <button type="button" data-testid="profile-done-btn">Receitas Feitas</button>
      <button type="button" data-testid="profile-favorite-btn">Receitas Favoritas</button>
      <button type="button" data-testid="profile-logout-btn">Sair</button>
      <Footer />
    </div>
  );
}
