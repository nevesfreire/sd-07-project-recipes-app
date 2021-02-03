import React, { useState, useEffect } from 'react';
import { Header, FavoriteAndDone } from '../../components';
import { getStorage } from '../../services/localStorage';

function FavoriteRecipes() {
  const [favorite, setFavorite] = useState([]);

  useEffect(() => {
    setFavorite(getStorage('favoriteRecipes'));
  }, []);

  return (
    <div>
      <Header />
      <FavoriteAndDone data={ [...favorite] } />
    </div>
  );
}

export default FavoriteRecipes;
