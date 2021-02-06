import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import FoodAppContext from '../context/FoodAppContext';
// import drinkIcon from '../images/drinkIcon.svg';
import drinkIcon from '../images/bebidasFooter.png';
// import exploreIcon from '../images/exploreIcon.svg';
import exploreIcon from '../images/explorarFooter.png';
// import mealIcon from '../images/mealIcon.svg';
import mealIcon from '../images/comidasFooter.png';
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
      <div className="footer-item-container">
        <button
          type="button"
          name="/bebidas"
          data-testid="drinks-bottom-btn"
          onClick={ handleClick }
          src={ drinkIcon }
        >
          <img className="rocksGlass" name="/bebidas" src={ drinkIcon } alt="drink" />
        </button>
        <p>Bebidas</p>
      </div>
      <div className="footer-item-container">
        <button
          type="button"
          name="/explorar"
          data-testid="explore-bottom-btn"
          onClick={ handleClick }
          src={ exploreIcon }
        >
          <img
            className="rocksGlass"
            name="/explorar"
            src={ exploreIcon }
            alt="explore"
          />
        </button>
        <p>Explorar</p>
      </div>
      <div className="footer-item-container">
        <button
          type="submit"
          name="/comidas"
          data-testid="food-bottom-btn"
          onClick={ handleClick }
          src={ mealIcon }
        >
          <img className="rocksGlass" name="/comidas" src={ mealIcon } alt="meal" />
        </button>
        <p>Comidas</p>
      </div>
    </div>
  );
}

export default Footer;
