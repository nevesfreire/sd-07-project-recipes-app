import React, { useContext, useEffect } from 'react';
import GlobalContext from '../context/GlobalContext';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Profile() {
  const {
    setTitle,
    setSearchButton,
    redirect,
    getStorage,
    clearStorage,
    emailLocalStorage,
    setEmailLocalStorage,
  } = useContext(GlobalContext);

  useEffect(() => {
    setTitle('Perfil');
    setSearchButton(false);
    setEmailLocalStorage(getStorage('user'));
  }, [setTitle, setSearchButton, setEmailLocalStorage, getStorage]);

  return (
    <div>
      <Header />
      <h3 data-testid="profile-email">{emailLocalStorage.email}</h3>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => redirect('/receitas-feitas') }
      >
        Receitas Feitas
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => redirect('/receitas-favoritas') }
      >
        Receitas Favoritas
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ () => {
          redirect('/');
          clearStorage();
        } }
      >
        Sair
      </button>
      <Footer />
    </div>
  );
}
