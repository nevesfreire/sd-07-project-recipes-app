import React, { useContext } from 'react';
import Header from '../../components/Header';
import RecipesContext from '../../Context/RecipesContext';

export default function Foods() {
  const { setPageTitle } = useContext(RecipesContext);
  setPageTitle('Comidas');
  return (
    <div>
      <Header />
      Comidas
    </div>
  );
}
