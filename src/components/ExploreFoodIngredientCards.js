import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

function ExploreFoodIngredientICards({ title, index, path }) {
  const { fetchInIngredientCard, redirectByIngredients } = useContext(RecipesContext);

  const pathToRedirect = (pathName) => {
    if (pathName === '/explorar/comidas/ingredientes') {
      return '/comidas';
    }
    return '/bebidas';
  };

  const selectingSrc = (pathName, ingredient) => {
    let source = '';
    if (pathName === '/explorar/comidas/ingredientes') {
      source = `https://www.themealdb.com/images/ingredients/${ingredient}-Small.png`;
    } else {
      source = `https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png`;
    }
    return source;
  };

  if (redirectByIngredients) {
    return <Redirect to={ pathToRedirect(path) } />;
  }

  return (
    <button type="button" onClick={ () => fetchInIngredientCard(title, path) }>
      <div data-testid={ `${index}-ingredient-card` }>
        <img
          src={ selectingSrc(path, title) }
          alt="Imagem do profile"
          data-testid={ `${index}-card-img` }
        />
        <div className="div" data-testid="page-div">
          <p data-testid={ `${index}-card-name` }>{title}</p>
        </div>
      </div>
    </button>
  );
}

ExploreFoodIngredientICards.propTypes = {
  title: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  path: PropTypes.string.isRequired,
};

export default ExploreFoodIngredientICards;
