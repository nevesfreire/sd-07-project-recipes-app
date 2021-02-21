import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import drink from '../images/drinkIcon.svg';
import useRedirect from '../hooks/useRedirect';
import context from '../contextApi/context';

function DrinkBtn() {
  const [setPath] = useRedirect();
  const PATH = '/bebidas';

  const { data, setData, change, setSearch } = useContext(context);

  const changeSearchAndSendPath = () => {
    setPath(PATH);

    if (change) {
      setSearch({ change: false });
      setData({ ...data, radioBtn: '', textSeach: '' });
    }
  };

  return (
    <div className="icon-drink">
      <Button
        type="button"
        onClick={ () => changeSearchAndSendPath() }
      >
        <img data-testid="drinks-bottom-btn" src={ drink } alt="button" />
      </Button>
    </div>
  );
}

export default DrinkBtn;
