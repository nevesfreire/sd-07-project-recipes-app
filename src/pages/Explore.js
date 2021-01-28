import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Explore.css';

function Explore() {
  return (
    <>
      <Header title="Explorar" isSearchable={ false } />
      <div className="content">
        <Link
          to="/explorar/comidas"
          data-testid="explore-food"
          className="explore-btn"
        >
          Explorar Comidas
        </Link>
        <Link
          to="/explorar/bebidas"
          data-testid="explore-drinks"
          className="explore-btn"
        >
          Explorar Bebidas
        </Link>
      </div>
      <Footer />
    </>
  );
}
export default Explore;
