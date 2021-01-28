import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/header';
import Footer from '../../components/footer';

class Perfil extends Component {
  render() {
    const { history } = this.props;
    const obje = JSON.parse(localStorage.getItem('user'));
    return (
      <div>
        <Header title="Perfil" searchOn="off" history={ history } />
        <Footer history={ history } />
        <div>
          <h4 data-testid="profile-email">
            {
              obje
                ? obje.email
                : <h1>sem email</h1>
            }
          </h4>
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
            onClick={ () => localStorage.clear(history.push('/')) }
          >
            Sair
          </button>
        </div>
      </div>
    );
  }
}

Perfil.propTypes = {
  history: PropTypes.objectOf({ push: PropTypes.func.isRequired }).isRequired,
};

export default Perfil;
