import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';

class Profile extends React.Component {
  render() {
    const { history } = this.props;
    const emailLocal = JSON.parse(localStorage.getItem('user'));

    return (
      <div className="profile">
        <h1>Perfil</h1>
        <h4 data-testid="profile-email">{emailLocal.email}</h4>
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
          onClick={ () => { history.push('/'); localStorage.clear(); } }
        >
          Sair
        </button>
        <Footer />
      </div>
    );
  }
}

export default Profile;

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
