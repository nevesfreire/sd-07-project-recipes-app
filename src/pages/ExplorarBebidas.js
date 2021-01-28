import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function ExplorarBebidad() {
  const isFalse = false;
  return (
    <div>
      <Header text="Explorar Bebidas" search={ isFalse } />
      <p>AQUI É O explorar bebidas</p>
      <Footer />
    </div>
  );
}

export default ExplorarBebidad;
