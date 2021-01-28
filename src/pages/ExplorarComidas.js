import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Explorar() {
  return (
    <div>
      <Header />
      <Link to="/explorar/comidas/ingredientes">
        <Card data-testid="explore-by-ingredient">
          <Card.Title>Por Ingredientes</Card.Title>
        </Card>
      </Link>

      <Link to="/explorar/comidas/area">
        <Card data-testid="explore-by-area">
          <Card.Title>Por Local de Origem</Card.Title>
        </Card>
      </Link>

      <Link to="/comidas/:id">
        <Card data-testid="explore-surprise">
          <Card.Title>Me Surpreenda!</Card.Title>
        </Card>
      </Link>
      <Footer />
    </div>
  );
}
