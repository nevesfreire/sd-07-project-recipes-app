import React, { useContext, useEffect } from 'react';
import GlobalContext from '../context/GlobalContext';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Drinks() {
  const { setTitle, setSearchButton } = useContext(GlobalContext);

  useEffect(() => {
    setTitle('Bebidas');
    setSearchButton(true);
  }, [setTitle, setSearchButton]);

  return (
    <div>
      <Header />
      <Footer />
    </div>
  );
}
