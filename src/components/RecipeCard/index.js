import React, { useState, useEffect } from 'react';

import StyledCard from './styles';

const RecipeCard = (props) => {
  const [cardInfoState, setCardInfoState] = useState(props);

  useEffect(() => {
    setCardInfoState(props);
  }, [props]);

  const { strThumb, name, index } = cardInfoState.cardInfo;
  return (
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
};

export default RecipeCard;
