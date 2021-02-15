import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import { CLEAR_ALL_FILTERS } from '../reducers';
import { CupNodesContext } from '../contexts';
import { Button } from './Contructors';
import './components.css';

function Footer() {
  const { dispatchFilter } = useContext(CupNodesContext);
  const { push } = useHistory();
  const go = (URL) => {
    dispatchFilter({ type: CLEAR_ALL_FILTERS });
    push(URL);
  };

  return (
    <div data-testid="footer" className="footer ">
      <Button
        testid="drinks-bottom-btn"
        icon={ drinkIcon }
        func={ () => go('/bebidas') }
      />
      <Button
        testid="explore-bottom-btn"
        icon={ exploreIcon }
        func={ () => go('/explorar') }
      />
      <Button
        testid="food-bottom-btn"
        icon={ mealIcon }
        func={ () => go('/comidas') }
      />
    </div>
  );
}

export default Footer;
