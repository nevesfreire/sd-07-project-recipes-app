import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function ExplorePage() {
  return (
    <div>
      <Header title="Explorar" />
      <main
        style={ {
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        } }
      >
        <Link to="/explorar/comidas">
          <Button
            style={ { marginTop: '50px', width: '300px' } }
            variant="info"
            data-testid="explore-food"
            size="lg"
          >
            Explorar Comidas
          </Button>
        </Link>
        <Link to="/explorar/bebidas">
          <Button
            style={ { marginTop: '20px', width: '300px' } }
            variant="info"
            data-testid="explore-drinks"
            size="lg"
          >
            Explorar Bebidas
          </Button>
        </Link>
      </main>
      <Footer />
    </div>
  );
}

export default ExplorePage;
