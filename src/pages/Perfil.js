import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function Perfil() {
  return (
    <div>
      <Header text="Perfil" search={ false } />
      <p>AQUI É A PAGINA DO USUARIO</p>
      <Footer />
    </div>
  );
}

export default Perfil;
