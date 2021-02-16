import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CardGroup } from 'react-bootstrap';

import { Header, RecipeFilter, RecipeDoneFavCard } from '../../components';
import useLocalStorage from '../../hooks/useLocalStorage';
import { LS_KEYS } from '../../services/localStorage';

const RecipeDone = () => {
  const { pathname } = useLocation();
  const filter = useSelector((state) => state.recipes.filter);
  const [recipes, setRecipes] = useLocalStorage(pathname.includes('feitas')
    ? LS_KEYS.DONE_RECIPES_KEY : LS_KEYS.FAVORITE_RECIPES_KEY, []);

  return (
    <>
      <Header
        title={ pathname.includes('feitas') ? 'Receitas Feitas' : 'Receitas Favoritas' }
        showSearchIcon={ false }
      />
      <RecipeFilter />
      <CardGroup>
        { recipes
          .filter((recipe) => recipe.type !== filter.term)
          .map((card, index) => (
            <RecipeDoneFavCard
              key={ card.id }
              doneOrFavorite={ pathname.includes('feitas') ? 'done' : 'favorite' }
              cardInfo={ card }
              index={ index }
              favoriteRecipes={ recipes }
              setFavoriteRecipes={ setRecipes }
            />
          ))}
      </CardGroup>
    </>
  );
};

export default RecipeDone;
