import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import context from '../contextAPI/context';
import mealIcon from '../images/mealIcon.svg';
import useRedirect from '../hooks/useRedirect';

const FoodBtn = () => {
  const PATH = '/comidas';
  const [setPath] = useRedirect();
  const { setState } = useContext(context);

  const handleClick = () => {
    setPath(PATH);
    setState((s) => ({
      ...s,
      toggleSearch: false,
    }));
  };

  return (
    <div className="food-btn">
      <Button
        onClick={ handleClick }
        variant="contained"
        className="footer-buttons"
      >
        <img data-testid="food-bottom-btn" src={ mealIcon } alt="food" />
      </Button>
    </div>
  );
};

export default FoodBtn;
