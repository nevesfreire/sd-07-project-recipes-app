import React, { useState, useEffect } from 'react';
import { Header, FavoriteAndDone } from '../../components';
import { getStorage } from '../../services/localStorage';

function DoneRecipes() {
  const [doneRecipes, setdoneRecipes] = useState([]);

  useEffect(() => {
    setdoneRecipes(getStorage('doneRecipes'));
  }, []);
  return (
    <div>
      <Header />
      <FavoriteAndDone data={ doneRecipes } />
    </div>
  );
}

export default DoneRecipes;
