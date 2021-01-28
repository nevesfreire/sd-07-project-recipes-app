import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function Explorar() {
  const isFalse = false;
  return (
    <div>
      <Header text="Explorar" search={ isFalse } />
      <p>AQUI É O explorar</p>
      <Footer />
    </div>
  );
}

export default Explorar;
