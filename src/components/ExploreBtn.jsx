import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import context from '../contextAPI/context';
// import { } from '../services/fetchApi';
// import Call from '../helpers/Call';
import exploreIcon from '../images/exploreIcon.svg';
import useRedirect from '../hooks/useRedirect';

const ExploreBtn = () => {
  const { setState } = useContext(context);
  const [setPath] = useRedirect();
  const PATH = '/explorar';

  const handleClick = () => {
    setPath(PATH);
    setState((s) => ({
      ...s,
      profileButton: true,
      title: 'Explorar',
      searchButton: false,
      toggleSearch: false,
    }));
  };

  return (
    <div className="explore-btn">
      <Button
        onClick={ handleClick }
        variant="contained"
        className="footer-buttons"
      >
        <img data-testid="explore-bottom-btn" src={ exploreIcon } alt="explore" />
      </Button>
    </div>
  );
};

export default ExploreBtn;
