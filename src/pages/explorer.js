import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import SearchHeaderBar from '../components/SearchHeaderBar';
import Footer from '../components/Footer';
import RecipeContext from '../context/RecipeContext';

function Explorer() {
  const { showBtn } = useContext(RecipeContext);
  return (
    <div>
      <Header />
      { showBtn && <SearchHeaderBar /> }
      <div>
        <Link to="/explorar/comidas">
          <button
            data-testid="explore-food"
            type="button"
          >
            Explorar Comidas
          </button>
        </Link>
        <Link to="/explorar/bebidas">
          <button
            data-testid="explore-drinks"
            type="button"
          >
            Explorar Bebidas
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default Explorer;
