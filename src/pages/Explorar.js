import React from 'react';
import Header from '../Components/Header';

function Explorar() {
  const isFalse = false;
  return (
    <div>
      <Header text="Explorar" search={ isFalse } />
      <p>AQUI É O explorar</p>
    </div>
  );
}

export default Explorar;
