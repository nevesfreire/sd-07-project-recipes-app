import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Header, RecipeFilter } from '../../components';

const RecipeDone = () => {
  const { pathname } = useLocation();
  const recipes = useSelector((state) => state.recipes);
  let cards;
  if (pathname.includes('feitas')) {
    cards = recipes.doneRecipes;
  } else {
    cards = recipes.favoriteRecipes;
  }

  return (
    <>
      <Header
        title={ pathname.includes('feitas') ? 'Receitas Feitas' : 'Receitas Favoritas' }
        showSearchBar={ false }
      />
      <RecipeFilter />
      {cards.map((card) => (
        <div key={ card.id }>
          <h1>{card.type}</h1>
          <h1>{card.name}</h1>
          <img src={ card.strThumb } alt="Receita" />
        </div>
      ))}
    </>
  );
};

export default RecipeDone;
