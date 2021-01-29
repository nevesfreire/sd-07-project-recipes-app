import React from 'react';
import PropTypes from 'prop-types';

import StyledCard from './styles';

const RecipeCard = ({ cardInfo: { strThumb, name, index } }) => (
  <StyledCard data-testid={ `${index}-recipe-card` }>
    <StyledCard.Img
      variant="top"
      src={ strThumb }
      data-testid={ `${index}-card-img` }
    />
    <StyledCard.Body>
      <StyledCard.Title
        data-testid={ `${index}-card-name` }
      >
        {name}
      </StyledCard.Title>
    </StyledCard.Body>
  </StyledCard>
);

RecipeCard.propTypes = {
  cardInfo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    strThumb: PropTypes.string.isRequired,
    index: PropTypes.string.isRequired,
  }).isRequired,
};

export default RecipeCard;
