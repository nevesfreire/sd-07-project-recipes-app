import React, { useContext, useEffect } from 'react';
import GlobalContext from '../context/GlobalContext';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ExploreButtons from '../components/ExploreButtons';

export default function FoodsExplore() {
  const { setTitle, setSearchButton, setRenderButtonExplore } = useContext(GlobalContext);

  useEffect(() => {
    setTitle('Explorar Comidas');
    setSearchButton(false);
    setRenderButtonExplore('comidas');
  }, [setTitle, setSearchButton, setRenderButtonExplore]);

  return (
    <div>
      <Header />
      <ExploreButtons />
      <Footer />
    </div>
  );
}
