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
      <div>
        { ingredients.map((element, index) => (
          <button
            type="button"
            data-testid={ `${index}-ingredient-card` }
            key={ index }
            onClick={ () => handleRedirect(element.strIngredient) }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ `https://www.themealdb.com/images/ingredients/${element.strIngredient}-Small.png` }
              alt="meal-ingredient"
            />
            <span
              data-testid={ `${index}-card-name` }
            >
              { element.strIngredient }
            </span>
          </button>
        )) }
      </div>
    );
  }

  function renderIngDrink() {
    return (
      <div>
        { ingredients.map((element, index) => (
          <button
            type="button"
            data-testid={ `${index}-ingredient-card` }
            key={ index }
            onClick={ () => handleRedirect(element.strIngredient1) }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ `https://www.thecocktaildb.com/images/ingredients/${element.strIngredient1}-Small.png` }
              alt="drink-ingredient"
            />
            <span
              data-testid={ `${index}-card-name` }
            >
              { element.strIngredient1 }
            </span>
          </button>
        )) }
      </div>
    );
  }

  return (
    <div>
      { (!ingredients) && isLoading() }
      { path === '/explorar/comidas/ingredientes' && renderIngMeal() }
      { path === '/explorar/bebidas/ingredientes' && renderIngDrink() }
    </div>
  );
}

Ingredients.propTypes = {
  path: PropTypes.string.isRequired,
};

export default Ingredients;
