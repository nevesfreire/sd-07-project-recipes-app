import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import context from '../contextAPI/context';
import { allFood } from '../services/fetchApi';
import mealIcon from '../images/mealIcon.svg';
import useRedirect from '../hooks/useRedirect';

const FoodBtn = () => {
  const PATH = '/comidas';
  const [setPath] = useRedirect();
  const { setState, setRecipesUrl } = useContext(context);

  const onClick = () => {
    setRecipesUrl(allFood);
    setState((s) => ({
      ...s,
      profileButton: true,
      title: 'Comidas',
      searchButton: true,
      toggleSearch: false,
    }));
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
