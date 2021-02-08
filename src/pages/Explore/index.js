import React from 'react';
import { NavLink } from 'react-router-dom';
import { Header, Footer } from '../../Components';
import './styles.css';

const Explore = () => (
  <div>
    <Header test="page-title">Explorar</Header>
    <div className="explore-buttons">
      <button
        type="button"
        data-testid="explore-food"
      >
        <NavLink to="/explorar/comidas" style={ { color: 'inherit' } }>
          Explorar Comidas
        </NavLink>
      </button>
      <button
        type="button"
        data-testid="explore-drinks"
      >
        <NavLink to="/explorar/bebidas" style={ { color: 'inherit' } }>
          Explorar Bebidas
        </NavLink>
      </button>
    </div>
    <Footer />
  </div>
);

export default Explore;
