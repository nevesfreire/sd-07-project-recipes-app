import React from 'react';
import { Button } from '@material-ui/core';
import exploreIcon from '../images/exploreIcon.svg';
import useRedirect from '../hooks/useRedirect';

function ExploreBtn() {
  const [setPath] = useRedirect();
  const PATH = '/explorar';
  return (
    <div className="icon-explorer">
      <Button
        type="button"
        onClick={ () => setPath(PATH) }
      >
        <img data-testid="explore-bottom-btn" src={ exploreIcon } alt="button" />
      </Button>
    </div>
  );
}

export default ExploreBtn;
