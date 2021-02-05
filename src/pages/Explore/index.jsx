import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../../components';
import './Explore.css';

export default function Explore() {
  return (
    <div className="explore-container">
      <Header title="Explorar" />
      <div className="explore-content">
        <Link data-testid="explore-food" to="/explorar/comidas"> Explorar Comidas</Link>
        <br />
        <Link data-testid="explore-drinks" to="/explorar/bebidas"> Explorar Bebidas</Link>
      </div>
      <Footer />
    </div>
  );
}
