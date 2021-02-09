import React, { useContext, useEffect } from 'react';
import CategoriesButtons from './CategoriesButtons';
import MadeContext from '../context/MadeContext';

export default function Made() {
  const { allMadeRecipes, setMade, getStorage } = useContext(MadeContext);

  useEffect(() => {
    setMade(getStorage('doneRecipes'));
  }, [setMade, getStorage]);

  return (
    <div>
      <CategoriesButtons />
      {allMadeRecipes()}
    </div>
  );
}
