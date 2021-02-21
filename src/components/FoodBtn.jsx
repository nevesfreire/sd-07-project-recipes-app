import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import useRedirect from '../hooks/useRedirect';
import mealIcom from '../images/mealIcon.svg';
import context from '../contextApi/context';

function FoodBtn() {
  const [setPath] = useRedirect();
  const PATH = '/comidas';

  const { data, setData, change, setSearch } = useContext(context);

  const changeSearchAndSendPath = () => {
    setPath(PATH);

    if (change) {
      setSearch({ change: false });
      setData({ ...data, radioBtn: '', textSeach: '' });
    }
  };

  return (
    <div className="icon-meal">
      <Button
        type="button"
        onClick={ () => changeSearchAndSendPath() }
      >
        <img data-testid="food-bottom-btn" src={ mealIcom } alt="button" />
      </Button>
    </div>
  );
}

export default FoodBtn;
