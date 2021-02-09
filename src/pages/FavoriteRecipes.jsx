import React, { useContext, useEffect } from 'react';
import GlobalContext from '../context/GlobalContext';
import Header from '../components/Header';
import Favorite from '../components/Favorite';
import FavProvider from '../context/FavProvider';

export default function FavoriteRecipes() {
  const { setTitle, setSearchButton } = useContext(GlobalContext);

  useEffect(() => {
    setTitle('Receitas Favoritas');
    setSearchButton(false);
  }, [setTitle, setSearchButton]);

  return (
    <FavProvider>
      <div>
        <Header />
        <Favorite />
      </div>
    </FavProvider>

  );
}
