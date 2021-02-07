import React, {useContext} from 'react';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import context from '../contextAPI/context';
// import { } from '../services/fetchApi';
// import Call from '../helpers/Call';
import exploreIcon from '../images/exploreIcon.svg';

const ExploreBtn = () => {
  const { setState } = useContext(context);
  const history = useHistory();
  const page = 'explorar';

  const onClick = () => {
    setState((s) => ({
      ...s,
      profileButton: true,
      title: 'Explorar',
      searchButton: false,
      toggleSearch: false,
    }));
    history.push(`/${page}`);
  };

  return (
    <div className="explore-btn">
      <Button
        onClick={ onClick }
        variant="contained"
        className="footer-buttons"
      >
        <img data-testid="explore-bottom-btn" src={ exploreIcon } alt="explore" />
      </Button>
    </div>
  );
};

export default ExploreBtn;
