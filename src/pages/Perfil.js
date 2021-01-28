import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';

class Perfil extends React.Component {
  render() {
    const { history, email } = this.props;
    // const emailLocal = JSON.parse(localStorage.getItem('user'));

    return (
      <div className="profile">
        <Header pageTitle="Perfil" />
        <h4 data-testid="profile-email">{email}</h4>
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

const mapStateToProps = ({ user: { email } }) => ({ email });

Perfil.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Perfil);
