import React from 'react';
import { Button } from '@material-ui/core';
// import { } from '../services/fetchApi';
// import Call from '../helpers/Call';
import exploreIcon from '../images/exploreIcon.svg';

const ExploreBtn = () => (
  <div className="explore-btn">
    <Button
      // onClick={ () => Call() }
      variant="contained"
      className="footer-buttons"
    >
      <img data-testid="explore-bottom-btn" src={ exploreIcon } alt="explore" />
    </Button>
  </div>
);

export default ExploreBtn;
