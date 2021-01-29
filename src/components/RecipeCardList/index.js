import React from 'react';
import PropTypes from 'prop-types';
import RecipeCard from '../RecipeCard';

import StyledCardDeck from './styles';

const RecipeCardList = ({ recipeList }) => (
  <StyledCardDeck>
    { recipeList.map(({ id, name, strThumb }, index) => (
      <RecipeCard key={ id } cardInfo={ { name, strThumb, index } } />
    ))}
  </StyledCardDeck>
);

RecipeCardList.propTypes = {
  recipeList: PropTypes.arrayOf({
    name: PropTypes.string.isRequired,
    strThumb: PropTypes.string.isRequired,
    index: PropTypes.string.isRequired,
  }).isRequired,
};

export default RecipeCardList;
