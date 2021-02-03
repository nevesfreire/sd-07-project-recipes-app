import React, { useContext, useEffect } from 'react';
import GlobalContext from '../context/GlobalContext';
import Header from '../components/Header';
import CategoriesButtons from '../components/CategoriesButtons';

export default function MadeRecipes() {
  const { setTitle, setSearchButton } = useContext(GlobalContext);

  useEffect(() => {
    setTitle('Receitas Feitas');
    setSearchButton(false);
  }, [setTitle, setSearchButton]);

  return (
    <div>
      <Header />
      <CategoriesButtons />
    </div>

  );
}
