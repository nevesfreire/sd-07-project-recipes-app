import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import context from '../contextAPI/context';
/* import { allDrink } from '../services/fetchApi'; */
import drinkIcon from '../images/drinkIcon.svg';
import useRedirect from '../hooks/useRedirect';

const DrinkBtn = () => {
  const PATH = '/bebidas';
  const [setPath] = useRedirect();
  const { setState } = useContext(context);

  const onClick = () => {
    setState((s) => ({
      ...s,
      toggleSearch: false,
    }));
    setPath(PATH);
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
