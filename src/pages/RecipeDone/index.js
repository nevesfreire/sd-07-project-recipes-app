import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { /* useDispatch,  */useSelector } from 'react-redux';
import { CardGroup } from 'react-bootstrap';
// import { updateFromLS } from '../../store/ducks/recipes';

import { Header, RecipeFilter, RecipeDoneFavCard } from '../../components';
import { LS_KEYS, loadKeyFromLS } from '../../services/localStorage';

const RecipeDone = () => {
  const { pathname } = useLocation();
  // const dispatch = useDispatch();
  const filter = useSelector((state) => state.recipes.filter);
  const doneRecipes = loadKeyFromLS(LS_KEYS.DONE_RECIPES_KEY, []);
  const favoriteRecipes = loadKeyFromLS(LS_KEYS.FAVORITE_RECIPES_KEY, []);
  const cardsFiltered = useRef([]);

  const cards = pathname.includes('feitas')
    ? doneRecipes : favoriteRecipes;

  /*  useEffect(() => {
    if (doneRecipes) {
      dispatch(updateFromLS({ [LS_KEYS.DONE_RECIPES_KEY]: doneRecipes }));
    }
  }, [dispatch, doneRecipes]);

  useEffect(() => {
    if (favoriteRecipes) {
      dispatch(updateFromLS({ [LS_KEYS.FAVORITE_RECIPES_KEY]: favoriteRecipes }));
    }
  }, [dispatch, favoriteRecipes]); */

  useEffect(() => {
    if (filter.type === 'foodOrDrink' && filter.term !== 'all') {
      cardsFiltered.current = cards.filter((recipe) => recipe.type === filter.term);
    } else {
      cardsFiltered.current = cards || [];
    }
  }, [filter, cards]);

  return (
    <>
      <Header
        title={ pathname.includes('feitas') ? 'Receitas Feitas' : 'Receitas Favoritas' }
        showSearchIcon={ false }
      />
      <RecipeFilter />
      <CardGroup>
        { cardsFiltered.current && cardsFiltered.current.map((card, index) => (
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
