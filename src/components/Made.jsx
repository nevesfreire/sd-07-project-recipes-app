import React, { useContext } from 'react';
import CategoriesButtons from './CategoriesButtons';
import MadeContext from '../context/MadeContext';

export default function Made() {
  const { allMadeRecipes } = useContext(MadeContext);
  return (
    <div>
      <CategoriesButtons />
      {allMadeRecipes()}
    </div>
  );
}
