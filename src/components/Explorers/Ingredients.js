import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Context } from '../../context/Provider';
import { fetchByIngredients } from '../../services/api';

function Ingredients({ path }) {
  const history = useHistory();
  const { setSearchByexplore, setFilterByExplore, setByExplore } = useContext(Context);
  const [ingredients, setIng] = useState([]);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const getIng = async () => {
    let type = '';
    if (path.includes('comidas')) {
      type = 'comidas';
    } else {
      type = 'bebidas';
    }
    const newIng = await fetchByIngredients(type);
    setIng(newIng);
  };

  useEffect(() => {
    getIng();
  }, []);

  useEffect(() => {
    if (!shouldRedirect) return;
    if (path.includes('comidas')) history.push('/comidas');
    else history.push('/bebidas');
  }, [shouldRedirect]);

  const isLoading = () => (<span>Loading...</span>);

  const handleRedirect = (name) => {
    setSearchByexplore(name);
    setFilterByExplore('ingredient');
    setByExplore(true);
    setShouldRedirect(true);
  };

  function renderIngMeal() {
    return (
      <div className="card__container">
        { ingredients.map((element, index) => (
          <button
            type="button"
            className="card"
            data-testid={ `${index}-ingredient-card` }
            key={ index }
            onClick={ () => handleRedirect(element.strIngredient) }
          >
            <header>
              <img
                data-testid={ `${index}-card-img` }
                src={ `https://www.themealdb.com/images/ingredients/${element.strIngredient}-Small.png` }
                alt="meal-ingredient"
              />
            </header>
            <main>
              <span data-testid={ `${index}-card-name` }>
                { element.strIngredient }
              </span>
            </main>
          </button>
        )) }
      </div>
    );
  }

  function renderIngDrink() {
    return (
      <div className="card__container">
        { ingredients.map((element, index) => (
          <button
            className="card"
            type="button"
            data-testid={ `${index}-ingredient-card` }
            key={ index }
            onClick={ () => handleRedirect(element.strIngredient1) }
          >
            <header>
              <img
                data-testid={ `${index}-card-img` }
                src={ `https://www.thecocktaildb.com/images/ingredients/${element.strIngredient1}-Small.png` }
                alt="drink-ingredient"
              />
            </header>
            <main>
              <span data-testid={ `${index}-card-name` }>
                { element.strIngredient1 }
              </span>
            </main>
          </button>
        )) }
      </div>
    );
  }

  return (
    <main style={ { marginTop: 10, marginBottom: 52 } }>
      { (!ingredients) && isLoading() }
      { path === '/explorar/comidas/ingredientes' && renderIngMeal() }
      { path === '/explorar/bebidas/ingredientes' && renderIngDrink() }
    </main>
  );
}

Ingredients.propTypes = {
  path: PropTypes.string.isRequired,
};

export default Ingredients;
