import React, { useContext, useEffect } from 'react';
import FavCategoriesButtons from './FavCategoriesButtons';
import FavContext from '../context/FavContext';

export default function Favorite() {
  const { allFavRecipes, setFavorite, getStorage } = useContext(FavContext);

  useEffect(() => {
    setFavorite(getStorage('favoriteRecipes'));
  }, [setFavorite, getStorage]);

  return (
    <div>
      <FavCategoriesButtons />
      {allFavRecipes()}
    </div>
  );
}
