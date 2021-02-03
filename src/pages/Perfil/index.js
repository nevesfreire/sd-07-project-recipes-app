import React, { Component } from 'react';
import { Container, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

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
    const title = 'Perfil';
    const emailNovo = (JSON.parse(localStorage.getItem('user'))).email;

    return (
      <div>
        <Header title={ title } />
        <Container>
          <h4 data-testid="profile-email">{emailNovo}</h4>
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
