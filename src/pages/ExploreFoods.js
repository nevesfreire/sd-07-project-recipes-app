import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useRandomRecipe from '../hooks/useRandomRecipe';

function ExploreFoods({ history }) {
  const type = 'comidas';
  const [getRandomRecipe] = useRandomRecipe();

  const handleClick = async () => {
    const valor = await getRandomRecipe(type);

    history.push(`/comidas/${valor}`);
  };

  return (
    <>
      <Header title="Explorar Comidas" isSearchable={ false } />
      <div className="content">
        <Link
          data-testid="explore-by-ingredient"
          to="/explorar/comidas/ingredientes"
          className="explore-btn"
        >
          Por Ingredientes
        </Link>
        <Link
          data-testid="explore-by-area"
          to="/explorar/comidas/area"
          className="explore-btn"
        >
          Por Local de Origem
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

ExploreFoods.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ExploreFoods;
