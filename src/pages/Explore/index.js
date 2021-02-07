import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../../Components';
import './style.css';

const Explore = () => (
  <div>
    <Header test="page-title">Explorar</Header>
    <div className="buttonBlue">
      <Link to="/explorar/comidas">
        <button type="button" data-testid="explore-food">Explorar Comidas</button>
      </Link>
    </div>
    <div className="buttonBlue">
      <Link to="/explorar/bebidas">
        <button type="button" data-testid="explore-drinks">Explorar Bebidas</button>
      </Link>
    </div>
    <Footer />
  </div>
);

export default Explore;
