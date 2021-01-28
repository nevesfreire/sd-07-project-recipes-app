import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function ExplorarComidas() {
  const isFalse = false;
  return (
    <div>
      <Header text="Explorar Comidas" search={ isFalse } />
      <p>AQUI É O explorar Comidas</p>
      <Footer />
    </div>
  );
}

export default ExplorarComidas;
