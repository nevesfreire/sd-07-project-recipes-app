import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import context from '../contextAPI/context';
import { allDrink } from '../services/fetchApi';
import drinkIcon from '../images/drinkIcon.svg';
import useRedirect from '../hooks/useRedirect';

const DrinkBtn = () => {
  const PAGE = '/bebidas';
  const [setPath] = useRedirect();
  const { setRecipesUrl, setState } = useContext(context);

  const onClick = () => {
    setRecipesUrl(allDrink);
    setState((s) => ({
      ...s,
      profileButton: true,
      title: 'Bebidas',
      searchButton: true,
      toggleSearch: false,
    }));
    setPath(PAGE);
  };

  return (
    <div className="drinks-btn">
      <Button
        onClick={ onClick }
        variant="contained"
        className="footer-buttons"
      >
        <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="drink" />
      </Button>
    </div>
  );
};

export default DrinkBtn;
