import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CardGroup } from 'react-bootstrap';
import { updateFromLS } from '../../store/ducks/recipes';

import { Header, RecipeFilter, RecipeDoneFavCard } from '../../components';
import { LS_KEYS, loadKeyFromLS } from '../../services/localStorage';

const RecipeDone = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const doneRecipes = loadKeyFromLS(LS_KEYS.DONE_RECIPES_KEY, []);
  const favoriteRecipes = loadKeyFromLS(LS_KEYS.FAVORITE_RECIPES_KEY, []);

  useEffect(() => {
    console.log('useEffect d', doneRecipes);
    if (doneRecipes) {
      dispatch(updateFromLS({ [LS_KEYS.DONE_RECIPES_KEY]: doneRecipes }));
    }
  }, [dispatch, doneRecipes]);

  useEffect(() => {
    console.log('useEffect f:', favoriteRecipes);
    if (favoriteRecipes) {
      dispatch(updateFromLS({ [LS_KEYS.FAVORITE_RECIPES_KEY]: favoriteRecipes }));
    }
  }, [dispatch, favoriteRecipes]);

  const cards = pathname.includes('feitas')
    ? doneRecipes : favoriteRecipes;

  console.log(cards);
  return (
    <>
      <Header
        title={ pathname.includes('feitas') ? 'Receitas Feitas' : 'Receitas Favoritas' }
        showSearchIcon={ false }
      />
      <RecipeFilter />
      <CardGroup>
        { cards && cards.map((card, index) => (
          <RecipeDoneFavCard
            key={ card.id }
            doneOrFavorite={ pathname.includes('feitas') ? 'done' : 'favorite' }
            cardInfo={ card }
            index={ index }
          />
        ))}
      </CardGroup>
    </>
  );
};

export default RecipeDone;
