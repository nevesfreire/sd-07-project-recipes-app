import React from 'react';
import { Link } from 'react-router-dom';
import FooterMenu from '../components/FooterMenu';
import Header from '../components/Header';

function ExplorePage() {
  return (
    <div>
      <Header />
      <div>
        <Link to="/explorar/comidas">
          <button data-testid="explore-food" type="button">Explorar Comidas</button>
        </Link>
        <Link to="/explorar/bebidas">
          <button data-testid="explore-drinks" type="button">Explorar Bebidas</button>
        </Link>
      </div>
      <FooterMenu />
    </div>
  );
}

export default ExplorePage;
