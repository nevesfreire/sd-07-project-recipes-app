import React, { useContext, useEffect } from 'react';
import GlobalContext from '../context/GlobalContext';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Profile() {
  const { setTitle, setSearchButton } = useContext(GlobalContext);

  useEffect(() => {
    setTitle('Perfil');
    setSearchButton(false);
  }, [setTitle, setSearchButton]);

  return (
    <div>
      <Header />
      <Footer />
    </div>
  );
}
