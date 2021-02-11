import React, { Component } from 'react';
import { Container, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import getStorage from '../../services/localStorageAPI/getStorage';
import setStorage from '../../services/localStorageAPI/setStorage';

import { Header, Footer } from '../../components';

class Perfil extends Component {
  constructor(props) {
    super(props);
    this.history = props.history;
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    localStorage.clear();
    this.history.push('/');
  }

  render() {
    const emailFromStorage = getStorage('user');
    if (!emailFromStorage) {
      setStorage('user', { email: 'admin@gmail.com' });
    }
    const title = 'Perfil';
    const emailEdited = (JSON.parse(localStorage.getItem('user'))).email;

    return (
      <div>
        <Header title={ title } />
        <Container>
          <h4 data-testid="profile-email">{emailEdited}</h4>
        </Container>
        <Container>
          <Button
            variant="secondary"
            block
            size="lg"
            data-testid="profile-done-btn"
            onClick={ () => this.history.push('/receitas-feitas') }
          >
            Receitas Feitas
          </Button>
          <Button
            variant="secondary"
            block
            size="lg"
            data-testid="profile-favorite-btn"
            onClick={ () => this.history.push('/receitas-favoritas') }
          >
            Receitas Favoritas
          </Button>
          <Button
            variant="secondary"
            block
            size="lg"
            data-testid="profile-logout-btn"
            onClick={ this.handleLogout }
          >
            Sair
          </Button>
        </Container>
        <Footer />
      </div>
    );
  }
}

Perfil.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Perfil;
