import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function ExplorarBebidas() {
  return (
    <div>
      <Header />
      <Link to="/explorar/bebidas/ingredientes">
        <Card data-testid="explore-by-ingredient">
          <Card.Title>Por Ingredientes</Card.Title>
        </Card>
      </Link>

      <Link to="/bebidas/:id">
        <Card data-testid="explore-surprise">
          <Card.Title>Me Surpreenda!</Card.Title>
        </Card>
      </Link>

      <Footer />
    </div>
  );
}
