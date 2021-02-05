import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import context from '../contextAPI/context';
import { allDrink } from '../services/fetchApi';

import drinkIcon from '../images/drinkIcon.svg';

const DrinkBtn = () => {
  const { setRecipesUrl } = useContext(context);
  return (
    <div className="drinks-btn">
      <Button
        onClick={ () => setRecipesUrl(allDrink) }
        variant="contained"
        className="footer-buttons"
      >
        <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="drink" />
      </Button>
    </div>
  );
};

export default DrinkBtn;
