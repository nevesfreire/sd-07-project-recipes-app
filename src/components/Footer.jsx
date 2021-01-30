import React, { useContext } from 'react';
import mealIcon from '../images/mealIcon.svg';
import GlobalContext from '../context/GlobalContext';
import exploreIcon from '../images/exploreIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import { FooterStyle } from './style';

const { Container } = FooterStyle;

export default function Footer() {
  const { styles: { colorTheme: { main } } } = useContext(GlobalContext);
  return (
    <Container data-testid="footer" bgColor={ main }>
      <a href="/comidas">
        <img
          src={ mealIcon }
          alt="comidas"
          data-testid="food-bottom-btn"
        />
      </a>
      <a href="/explorar">
        <img
          src={ exploreIcon }
          alt="explorar"
          data-testid="explore-bottom-btn"
        />
      </a>
      <a href="/bebidas">
        <img
          src={ drinkIcon }
          alt="bebidas"
          data-testid="drinks-bottom-btn"
        />
      </a>
    </Container>
  );
}
