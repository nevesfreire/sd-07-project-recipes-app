import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../../components';

const RecipeExplore = () => (
  <div>
    <Header
      title="Explorar"
      showSearchIcon={ false }
    />
    <Link
      to="/explorar/comidas"
      data-testid="explore-food"
    >
      <span>Explorar Comidas</span>
    </Link>
    <Link
      to="/explorar/bebidas"
      data-testid="explore-drinks"
    >
      <span>Explorar Bebidas</span>
    </Link>
    <Footer />
  </div>
);

export default RecipeExplore;
