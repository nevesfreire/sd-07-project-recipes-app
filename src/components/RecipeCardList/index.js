import React, { useState, useEffect } from 'react';
import RecipeCard from '../RecipeCard';

import StyledCardDeck from './styles';

const RecipeCardList = (props) => {
  const [recipeListState, setRecipeListState] = useState(props);

  useEffect(() => {
    setRecipeListState(props);
  }, [props]);

  const { recipeList } = recipeListState;
  return (
    <StyledCardDeck>
      { recipeList.map(({ id, name, image }, index) => (
        <RecipeCard key={ id } cardInfo={ { id, name, image, index } } />
      ))}
    </StyledCardDeck>
  );
};

export default RecipeCardList;
