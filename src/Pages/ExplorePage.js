import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FooterMenu from '../components/FooterMenu';
import Header from '../components/Header';

function ExplorePage() {
  return (
    <div>
      <Header title="Explorar" explore={ false } />
      <div className="divButton">
        <Link to="/explorar/comidas">
          <Button
            variant="dark"
            className="buttonCategories"
            data-testid="explore-food"
            type="button"
          >
            Explorar Comidas
          </Button>
        </Link>
        <Link to="/explorar/bebidas">
          <Button
            variant="dark"
            className="buttonCategories"
            data-testid="explore-drinks"
            type="button"
          >
            Explorar Bebidas
          </Button>
        </Link>
      </div>
      <FooterMenu />
    </div>
  );
}

export default ExplorePage;
