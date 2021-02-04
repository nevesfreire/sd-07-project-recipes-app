import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import HeaderNoSearch from '../components/HeaderNoSearch';
import Footer from '../components/Footer';
import RecipesContext from '../context/RecipesContext';

function Profile() {
  // const goDoneRecipes = () => props.history.push('/receitas-feitas');
  // const goFavoriteRecipes = () => props.history.push('/receitas-favoritas');
  // const goLogin = () => {
  //   props.history.push('/');
  //   localStorage.clear();
  // };
  const { login } = useContext(RecipesContext);
  return (
    <div>
      <HeaderNoSearch title="Perfil" />
      <div>
        <section
          type="email"
          id="email"
          data-testid="profile-email"
        >
          <strong>User:</strong>
          {login.email}
        </section>
        <Link to="/receitas-feitas">
          <button
            type="button"
            data-testid="profile-done-btn"
          // onClick={ () => goDoneRecipes() }
          >
            Receitas Feitas
          </button>
        </Link>
        <Link to="/receitas-favoritas">
          <button
            type="button"
            data-testid="profile-favorite-btn"
          // onClick={ () => goFavoriteRecipes() }
          >
            Receitas Favoritas
          </button>
        </Link>
        <Link to="/">
          <button
            type="button"
            data-testid="profile-logout-btn"
          // onClick={ () => goLogin() }
          >
            Sair
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

Profile.propTypes = {
  history: PropTypes.func.isRequired,
};

export default Profile;
