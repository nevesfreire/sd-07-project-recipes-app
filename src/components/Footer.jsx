import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import FoodAppContext from '../context/FoodAppContext';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/footer.css';

function Footer() {
  const history = useHistory();

  const { setShowSearch } = useContext(FoodAppContext);

  const handleClick = ({ target }) => {
    setShowSearch(false);
    history.push(target.name);
  };

  return (
    <div className="footer" data-testid="footer">
      <button
        type="button"
        name="/bebidas"
        data-testid="drinks-bottom-btn"
        onClick={ handleClick }
        src={ drinkIcon }
      >
        <img className="rocksGlass" name="/bebidas" src={ drinkIcon } alt="drink" />
      </button>
      <button
        type="button"
        name="/explorar"
        data-testid="explore-bottom-btn"
        onClick={ handleClick }
        src={ exploreIcon }
      >
        <img className="rocksGlass" name="/explorar" src={ exploreIcon } alt="explore" />
      </button>
      <button
        type="submit"
        name="/comidas"
        data-testid="food-bottom-btn"
        onClick={ handleClick }
        src={ mealIcon }
      >
        <img className="rocksGlass" name="/comidas" src={ mealIcon } alt="meal" />
      </button>
    </div>
  );
}

export default Footer;
