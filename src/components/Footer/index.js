import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Drink from '../../images/drinkIcon.svg';
import Explore from '../../images/exploreIcon.svg';
import Meal from '../../images/mealIcon.svg';

class Footer extends React.Component {
  render() {
    return (
      <footer>
        <Navbar expand="lg" variant="light" bg="light" data-testid="footer">
          <Container>
            <Navbar.Brand href="#"><img alt="logo" src={ Drink } /></Navbar.Brand>
            <Navbar.Brand href="#">
              <img alt="logo" src={ Explore } testid="explore-bottom-btn" />
            </Navbar.Brand>
            <Navbar.Brand href="#"><img alt="logo" src={ Meal } /></Navbar.Brand>
          </Container>
        </Navbar>
      </footer>
    );
  }
}

export default Footer;
