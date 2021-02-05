import React, { useState } from 'react';
import Header from '../components/Header';
import Done from '../components/Done';
import ButtonsFavorite from '../components/ButtonsFavorite';
import '../styles/done.css';

function DoneRecipes() {
  const localRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const [recipesStorage, setRecipesStorage] = useState(!localRecipes ? [] : localRecipes);
  return (
    <div>
      <Header title="Receitas Feitas" isSearchable={ false } />
      <ButtonsFavorite
        setRecipesStorage={ setRecipesStorage }
        localRecipes={ localRecipes }
      />
      <Done
        setRecipesStorage={ setRecipesStorage }
        recipesStorage={ recipesStorage }
      />
    </div>
  );
}
export default DoneRecipes;
