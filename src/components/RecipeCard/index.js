import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import StyledCard from './styles';

const RecipeCard = (props) => {
  const [cardInfoState, setCardInfoState] = useState(props);
  const { pathname } = useLocation();
  const history = useHistory();

  useEffect(() => {
    setCardInfoState(props);
  }, [props]);

  const handleClick = (id) => history.push(
    pathname.includes('comidas') ? `/comidas/${id}`
      : `/bebidas/${id}`,
  );

  const { image, name, index, id } = cardInfoState.cardInfo;
  return (
    <StyledCard data-testid={ `${index}-recipe-card` }>
      <StyledCard.Img
        variant="top"
        src={ image }
        data-testid={ `${index}-card-img` }
        onClick={ () => handleClick(id) }
      />
      <StyledCard.Body>
        <StyledCard.Title
          data-testid={ `${index}-card-name` }
          onClick={ () => handleClick(id) }
        >
          {name}
        </StyledCard.Title>
      </StyledCard.Body>
    </StyledCard>
  );
};

export default RecipeCard;
