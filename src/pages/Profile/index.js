import React, { useContext } from 'react';
import Header from '../../components/Header';
import RecipesContext from '../../Context/RecipesContext';

export default function Profile() {
  const { setPageTitle } = useContext(RecipesContext);
  setPageTitle('Perfil');
  return (
    <div>
      <Header />
      Perfil
    </div>
  );
}
