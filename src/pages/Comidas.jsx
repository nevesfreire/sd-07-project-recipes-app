import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CardsFood from '../components/CardsFood';

function Comidas() {
  return (
    <div>
      <Header name="Comidas" button />
      <CardsFood />
      <Footer />
    </div>
  );
}

export default Comidas;
