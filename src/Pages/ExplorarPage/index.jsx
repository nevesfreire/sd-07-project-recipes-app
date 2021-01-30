import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import '../../App.css';

const Explorar = () => (
  <div className="container-over">
    <div className="container-int">
      <Header title="Explorar" />
      <Link to="/explorar/comidas" data-testid="explore-food">
        Explorar Comidas
        <img src="" alt="Icone explorar comidas" />
      </Link>
      <Link to="/explorar/bebidas" data-testid="explore-drinks">
        Explorar Bebidas
        <img src="" alt="Icone de explorar bebidas" />
      </Link>
      <Footer />
    </div>
  </div>
);

export default Explorar;
