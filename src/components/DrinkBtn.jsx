import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import context from '../contextAPI/context';
import { allDrink } from '../services/fetchApi';
import drinkIcon from '../images/drinkIcon.svg';

const DrinkBtn = () => {
  const { setRecipesUrl, setState } = useContext(context);
  const history = useHistory();
  const page = 'bebidas';

  const onClick = () => {
    setRecipesUrl(allDrink);
    setState((s) => ({
      ...s,
      profileButton: true,
      title: 'Bebidas',
      searchButton: true,
      toggleSearch: false,
    }));
    history.push(`/${page}`);
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
