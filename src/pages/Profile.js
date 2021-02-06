import React from 'react';
import { useHistory } from 'react-router-dom';
import { useLocalStorage } from '../hooks';
import { Header, Footer, Button } from '../components';

export default function Profile() {
  const { push } = useHistory();
  const [{ email }] = useLocalStorage('user');
  console.log(email);
  return (
    <div>
      <Header title="Perfil" search={ false } />
      <h3 data-testid="profile-email">{email}</h3>
      <Button
        testid="profile-done-btn"
        text="Receitas Feitas"
        func={ () => { push('/receitas-feitas'); } }
      />
      <Button
        testid="profile-favorite-btn"
        text="Receitas Favoritas"
        func={ () => { push('/receitas-favoritas'); } }
      />
      <Button
        testid="profile-logout-btn"
        text="Sair"
        func={ () => {
          localStorage.clear();
          push('/');
        } }
      />
      <Footer />
    </div>
  );
}
