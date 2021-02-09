import React from 'react';
import { Link } from 'react-router-dom';
import HeaderNoSearch from '../components/HeaderNoSearch';
import Footer from '../components/Footer';

function Explorer() {
  return (
    <div className="profiles">
      <HeaderNoSearch title="Explorar" />
      <div>
        <div className="profile-buttons">
          <Link to="/explorar/comidas">
            <button type="button" data-testid="explore-food">
              Explorar Comidas
            </button>
          </Link>
          <Link to="/explorar/bebidas">
            <button type="button" data-testid="explore-drinks">
              Explorar Bebidas
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Explorer;
