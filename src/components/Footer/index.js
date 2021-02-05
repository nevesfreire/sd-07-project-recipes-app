import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { setFilter } from '../../store/ducks/recipes';

import { drinkIcon, exploreIcon, mealIcon } from '../../images';

import { StyledNavBar, StyledImage } from './styles';

function Footer() {
  const history = useHistory();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const handleClick = (path) => {
    if (pathname !== path) {
      dispatch(setFilter(''));
    }
    history.push(path);
  };

  return (
    <StyledNavBar
      fixed="bottom"
      data-testid="footer"
      className="justify-content-between"
    >
      <StyledImage
        data-testid="drinks-bottom-btn"
        src={ drinkIcon }
        alt="Drinks"
        onClick={ () => handleClick('/bebidas') }
      />
      <StyledImage
        data-testid="explore-bottom-btn"
        src={ exploreIcon }
        alt="Explore"
        onClick={ () => handleClick('/explorar') }
      />
      <StyledImage
        data-testid="food-bottom-btn"
        src={ mealIcon }
        alt="Foods"
        onClick={ () => handleClick('/comidas') }
      />
    </StyledNavBar>
  );
}

export default Footer;
