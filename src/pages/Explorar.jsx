import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Explorar() {
  return (
    <div>
      <Header name="Explorar" button={ false } />

      <Link
        to="/explorar/comidas"
        data-testid="explore-food"
      >
        Explorar Comidas
      </Link>

      <Link
        to="/explorar/bebidas"
        data-testid="explore-drinks"
      >
        Explorar Bebidas
      </Link>
      <Footer />
    </div>
  );
}

export default Explorar;
