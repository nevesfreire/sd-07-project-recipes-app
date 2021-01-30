import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Drink from '../../images/drinkIcon.svg';
import Explore from '../../images/exploreIcon.svg';
import Meal from '../../images/mealIcon.svg';

import './footer.css';

class Footer extends React.Component {
  render() {
    return (
      <footer>
        <Navbar
          expand="lg"
          variant="light"
          bg="light"
          data-testid="footer"
          className="footer"
        >
          <Container>
            <Navbar.Brand>
              <Link to="/bebidas" replace>
                <img data-testid="drinks-bottom-btn" src={ Drink } alt="drink" />
              </Link>
            </Navbar.Brand>
            <Navbar.Brand>
              <Link to="/explorar" replace>
                <img data-testid="explore-bottom-btn" src={ Explore } alt="explore" />
              </Link>
            </Navbar.Brand>
            <Navbar.Brand>
              <Link to="/comidas" replace>
                <img data-testid="food-bottom-btn" src={ Meal } alt="food" />
              </Link>
            </Navbar.Brand>
          </Container>
        </Navbar>
      </footer>
    );
  }
}

export default Footer;
