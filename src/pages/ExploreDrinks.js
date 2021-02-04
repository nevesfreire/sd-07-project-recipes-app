import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Explore.css';
import useRandomRecipe from '../hooks/useRandomRecipe';

function ExploreDrinks({ history }) {
  const type = 'bebidas';
  const [getRandomRecipe] = useRandomRecipe();

  const handleClick = async () => {
    const valor = await getRandomRecipe(type);

    history.push(`/bebidas/${valor}`);
  };

  return (
    <>
      <Header title="Explorar Bebidas" isSearchable={ false } />
      <div className="content">
        <Link
          data-testid="explore-by-ingredient"
          to="/explorar/bebidas/ingredientes"
          className="explore-btn"
        >
          Por Ingredientes
        </Link>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ () => handleClick() }
          className="explore-surprise-btn"
        >
          Me Surpreenda!
        </button>
      </div>
      <Footer />
    </>
  );
}

ExploreDrinks.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ExploreDrinks;
