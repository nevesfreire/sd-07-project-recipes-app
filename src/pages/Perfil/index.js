import React, { Component } from 'react';
import { Container, Button } from 'react-bootstrap';
import { Header, Footer } from '../../components';

class Perfil extends Component {
  render() {
    const title = 'Perfil';
    return (
      <div>
        <Header title={ title } />
        <Container>
          <h1>email aqui</h1>
        </Container>
        <Container>
          <Button variant="secondary" size="lg" block>
            Receitas Feitas
          </Button>
          <Button variant="secondary" size="lg" block>
            Receitas Favoritas
          </Button>
          <Button variant="secondary" size="lg" block>
            Sair
          </Button>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default Perfil;
