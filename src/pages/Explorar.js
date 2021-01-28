import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Explorar() {
  return (
    <div>
      <Header />

      <Link to="/explorar/comidas">
        <Card data-testid="explore-food">
          <Card.Title>Explorar Comidas</Card.Title>
        </Card>
      </Link>

      <Link to="/explorar/bebidas">
        <Card data-testid="explore-drinks">
          <Card.Title>Explorar Bebidas</Card.Title>
        </Card>
      </Link>

      <Footer />
    </div>
  );
}
