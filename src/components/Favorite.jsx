import React, { useContext } from 'react';
import FavCategoriesButtons from './FavCategoriesButtons';
import FavContext from '../context/FavContext';

export default function Favorite() {
  const { allFavRecipes } = useContext(FavContext);
  return (
    <div>
      <FavCategoriesButtons />
      {allFavRecipes()}
    </div>
  );
}
