import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import context from '../contextAPI/context';
import { allFood } from '../services/fetchApi';
import mealIcon from '../images/mealIcon.svg';

const FoodBtn = () => {
  const { setState, setRecipesUrl } = useContext(context);
  const page = 'comidas';
  const history = useHistory();

  const onClick = () => {
    setRecipesUrl(allFood);
    setState((s) => ({
      ...s,
      profileButton: true,
      title: 'Comidas',
      searchButton: true,
      toggleSearch: false,
    }));
    history.push(`/${page}`);
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
