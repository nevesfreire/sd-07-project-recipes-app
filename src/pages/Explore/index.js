import React from 'react';
import { Link } from 'react-router-dom';
import { Footer, Header } from '../../components';
import './style.css';

function Explore() {
  return (
    <div>
      <Header />
      <div className="explore-container">
        <Link className="explore-content" to="/explorar/comidas">
          <button className="explore-button" type="button" data-testid="explore-food">
            Explorar Comidas
          </button>
        </Link>
        <Link className="explore-content" to="/explorar/bebidas">
          <button className="explore-button" type="button" data-testid="explore-drinks">
            Explorar Bebidas
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default Explore;
