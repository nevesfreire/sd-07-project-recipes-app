import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import context from '../contextAPI/context';
import mealIcon from '../images/mealIcon.svg';
import useRedirect from '../hooks/useRedirect';

const FoodBtn = () => {
  const PATH = '/comidas';
  const [setPath] = useRedirect();
  const { setState } = useContext(context);

  const onClick = () => {
    setState((s) => ({
      ...s,
      data: null,
      toggleSearch: false,
    }));
    console.log('Estou em ', PATH);
    setPath(PATH);
  };

  return (
    <div className="food-btn">
      <Button
        onClick={ onClick }
        variant="contained"
        className="footer-buttons"
      >
        <img data-testid="food-bottom-btn" src={ mealIcon } alt="food" />
      </Button>
    </div>
  );
};

export default FoodBtn;
