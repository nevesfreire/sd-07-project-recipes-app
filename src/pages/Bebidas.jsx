import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CardsDrink from '../components/CardsDrink'

function Bebidas() {
  return (
    <div>
      <Header name="Bebidas" button />
      <CardsDrink />
      <Footer />
    </div>
  );
}

export default Bebidas;
