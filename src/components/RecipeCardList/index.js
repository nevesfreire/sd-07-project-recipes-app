import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import RecipeCard from '../RecipeCard';

import StyledCardDeck from './styles';

const RecipeCardList = (props) => {
  const [recipeListState, setRecipeListState] = useState(props);
  const { pathname } = useLocation();

  useEffect(() => {
    setRecipeListState(props);
  }, [props]);

  const { recipeList } = recipeListState;
  return (
    <StyledCardDeck>
      { recipeList.map(({ id, name, strThumb }, index) => (
        <Link
          to={ pathname.includes('comidas') ? `/comidas/${id}`
            : `/bebidas/${id}` }
          key={ id }
        >
          <RecipeCard key={ id } cardInfo={ { name, strThumb, index } } />
        </Link>
      ))}
    </StyledCardDeck>
  );
};

export default RecipeCardList;
