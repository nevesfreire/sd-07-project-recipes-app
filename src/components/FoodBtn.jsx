import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import context from '../contextAPI/context';
import { allFood } from '../services/fetchApi';
import mealIcon from '../images/mealIcon.svg';

const FoodBtn = () => {
  const { setRecipesUrl } = useContext(context);
  return (
    <div className="food-btn">
      <Button
        onClick={ () => setRecipesUrl(allFood) }
        variant="contained"
        className="footer-buttons"
      >
        <img data-testid="food-bottom-btn" src={ mealIcon } alt="food" />
      </Button>
    </div>
  );
};

export default FoodBtn;
