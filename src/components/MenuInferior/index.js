import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
/* import Container from 'react-bootstrap/Container'; */

class MenuInferior extends React.Componet {
  render() {
    return (
      <div>
        <Navbar expand="lg" variant="light" bg="light">
          <Container>
            <Navbar.Brand href="#">Bebida</Navbar.Brand>
            <Navbar.Brand href="#">Comida</Navbar.Brand>
            <Navbar.Brand href="#">Exploraçaor</Navbar.Brand>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default MenuInferior;
