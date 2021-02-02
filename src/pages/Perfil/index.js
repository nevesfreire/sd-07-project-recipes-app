import React, { Component } from 'react';
import { Container, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { Header, Footer } from '../../components';

class Perfil extends Component {
  render() {
    const title = 'Perfil';
    const { history } = this.props;
    return (
      <div>
        <Header title={ title } />
        <Container>
          <h1 data-testid="profile-email">email@email</h1>
        </Container>
        <Container>
          <Button
            variant="secondary"
            block
            size="lg"
            data-testid="profile-done-btn"
            onClick={ () => history.push('/receitas-feitas') }
          >
            Receitas Feitas
          </Button>
          <Button
            variant="secondary"
            block
            size="lg"
            data-testid="profile-favorite-btn"
            onClick={ () => history.push('/receitas-favoritas') }
          >
            Receitas Favoritas
          </Button>
          <Button
            variant="secondary"
            block
            size="lg"
            data-testid="profile-logout-btn"
            onClick={ () => history.push('/') }
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
