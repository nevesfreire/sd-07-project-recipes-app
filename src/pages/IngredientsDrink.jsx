import React, { useContext, useEffect } from 'react';
import GlobalContext from '../context/GlobalContext';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function IngredientsDrink() {
  const { setTitle, setSearchButton } = useContext(GlobalContext);

  useEffect(() => {
    setTitle('Explorar Ingredientes');
    setSearchButton(false);
  }, [setTitle, setSearchButton]);

  return (
    <div>
      <Header />
      <Footer />
    </div>
  );
}
