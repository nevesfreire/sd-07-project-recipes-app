import React, { useContext } from 'react';
import Footer from '../components/Footer';
import GlobalContext from '../context/GlobalContext';

export default function Explore() {
  const { redirect } = useContext(GlobalContext);
  return (
    <div>
      <h1>Explorar</h1>
      <button
        type="button"
        data-testid="explore-food"
        onClick={ () => redirect('/explorar/comidas') }
      >
        Explorar Comidas
      </button>
      <button
        type="button"
        data-testid="explore-drinks"
        onClick={ () => redirect('/explorar/bebidas') }
      >
        Explorar Bebidas
      </button>
      <Footer />
    </div>
  );
}
