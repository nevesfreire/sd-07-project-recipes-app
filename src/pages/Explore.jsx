import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import GlobalContext from '../context/GlobalContext';

export default function Explore() {
  const { redirect, setTitle, setSearchButton } = useContext(GlobalContext);

  useEffect(() => {
    setTitle('Explorar');
    setSearchButton(false);
  }, [setTitle, setSearchButton]);

  return (
    <div>
      <Header />
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
