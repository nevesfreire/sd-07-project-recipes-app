import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Drink from '../../images/drinkIcon.svg';
import Explore from '../../images/exploreIcon.svg';
import Meal from '../../images/mealIcon.svg';

class Footer extends React.Component {
  wrapperLink(pathImg, pathRoute, dataId) {
    return (
      <Link to={ pathRoute } replace>
        <img data-testid={ `${dataId}-bottom-btn` } src={ pathImg } alt="drink" />
      </Link>
    );
  }

  render() {
    return (
      <footer>
        <Navbar
          expand="lg"
          variant="light"
          bg="light"
          data-testid="footer"
          fixed="bottom"
        >
          <Container>
            <Navbar.Brand>
              {this.wrapperLink(Drink, '/bebidas', 'drinks')}
            </Navbar.Brand>
            <Navbar.Brand>
              {this.wrapperLink(Explore, '/explorar', 'explore')}
            </Navbar.Brand>
            <Navbar.Brand>
              {this.wrapperLink(Meal, '/comidas', 'food')}
            </Navbar.Brand>
          </Container>
        </Navbar>
      </footer>
    );
  }
}

export default Footer;
