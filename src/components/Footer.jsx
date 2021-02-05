import React from 'react';
import DrinkBtn from './DrinkBtn';
import ExploreBtn from './ExploreBtn';
import FoodBtn from './FoodBtn';
import '../css/footer.css';

const Footer = () => (
  <footer data-testid="footer" className="footer footer-container">
    <DrinkBtn />
    <ExploreBtn />
    <FoodBtn />
  </footer>
);

export default Footer;
