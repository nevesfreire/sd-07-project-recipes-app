import React, { useContext, useEffect } from 'react';
import GlobalContext from '../context/GlobalContext';
import Header from '../components/Header';

export default function FavoriteRecipes() {
  const { setTitle, setSearchButton } = useContext(GlobalContext);

  useEffect(() => {
    setTitle('Receitas Favoritas');
    setSearchButton(false);
  }, [setTitle, setSearchButton]);

  return (
    <Header />
  );
}
