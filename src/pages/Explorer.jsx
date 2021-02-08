import React from 'react';
import { Link } from 'react-router-dom';

import Footer from '../components/Footer';

function Explorer() {
  return (
    <div className="profile-buttons">
      <Link to="/explorar/comidas">
        <button
          className="btn color-button main-pages-buttons"
          data-testid="explore-food"
          type="button"
        >
          Explorar Comidas
        </button>
      </Link>
      <Link to="/explorar/bebidas">
        <button
          className="btn color-button main-pages-buttons"
          data-testid="explore-drinks"
          type="button"
        >
          Explorar Bebidas
        </button>
      </Link>
      <Footer />
    </div>
  );
}

export default Explorer;
