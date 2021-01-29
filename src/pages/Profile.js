import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import allActions from '../actions';

function Profile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { email } = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    dispatch(allActions.changePageTitle('Perfil'));
  }, [dispatch]);

  const handleClick = ({ target }) => {
    const getAttributeId = target.getAttribute('data-testid');
    if (getAttributeId === 'profile-done-btn') {
      history.push('/receitas-feitas');
    } else if (getAttributeId === 'profile-favorite-btn') {
      history.push('/receitas-favoritas');
    } else {
      localStorage.clear();
      history.push('/');
    }
  };

  return (
    <div>
      <Header />
      <section>
        <p data-testid="profile-email">{ email }</p>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ handleClick }
        >
          Receitas Feitas
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ handleClick }
        >
          Receitas Favoritas
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ handleClick }
        >
          Sair
        </button>
      </section>
      <Footer />
    </div>
  );
}

export default Profile;
