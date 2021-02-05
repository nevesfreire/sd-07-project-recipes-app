import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { shareIcon } from '../../images';

import StyledImage from './styles';

export default function ShareButton(props) {
  const [propsState] = useState(props);
  const { recipeId, type } = propsState;

  const handleClick = () => {
    copy(`${window.location.origin}/${type}/${recipeId}`);
  };

  return (
    <StyledImage
      src={ shareIcon }
      onClick={ handleClick }
      alt="Share"
      data-testid="share-btn"
    />
  );
}
