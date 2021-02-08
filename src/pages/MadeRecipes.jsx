import React, { useContext, useEffect } from 'react';
import GlobalContext from '../context/GlobalContext';
import Header from '../components/Header';
import Made from '../components/Made';
import MadeProvider from '../context/MadeProvider';

export default function MadeRecipes() {
  const { setTitle, setSearchButton } = useContext(GlobalContext);

  useEffect(() => {
    setTitle('Receitas Feitas');
    setSearchButton(false);
  }, [setTitle, setSearchButton]);

  return (
    <MadeProvider>
      <div>
        <Header />
        <Made />
      </div>
    </MadeProvider>
  );
}
