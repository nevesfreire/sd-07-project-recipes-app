import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getItem, initialize } from '../../services/localStorage';

function Profile({ history, search = false }) {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const emailFromLocalStorage = getItem('user');
    if (!emailFromLocalStorage) initialize();
    else setEmail(emailFromLocalStorage.email);
  }, []);

  const localStorageClear = () => {
    localStorage.clear();
  };

  return (
    <>
      <Header history={ history } search={ search } />
      <main>
        <p data-testid="profile-email">{ email }</p>
        <Link to="receitas-feitas">
          <button
            type="button"
            data-testid="profile-done-btn"
          >
            Receitas Feitas
          </button>
        </Link>
        <Link to="receitas-favoritas">
          <button
            type="button"
            data-testid="profile-favorite-btn"
          >
            Receitas Favoritas
          </button>
        </Link>
        <Link to="/">
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ () => localStorageClear() }
          >
            Sair
          </button>
        </Link>
      </main>
      <Footer />
    </>
  );
}

Profile.defaultProps = { search: false };

Profile.propTypes = {
  search: PropTypes.bool,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Profile;
