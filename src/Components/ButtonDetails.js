import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';

function ButtonDetails(props) {
  const [isDoing, setIsDoing] = useState(false);
  const {
    idParams,
    done,
    doing,
    recipe,
    recipeIngredients,
  } = useContext(RecipesContext);
  const [startRecipe, setStartRecipe] = useState(false);
  const { type } = props;

  useEffect(() => {
    setIsDoing(true);
  }, [doing]);

  const startingRecipe = () => {
    const recipeDoing = JSON.parse(window.localStorage.getItem('inProgressRecipes'));
    if (!recipeDoing && !recipe.strAlcoholic) {
      window.localStorage.setItem('inProgressRecipes',
        JSON.stringify({ cocktails: {}, meals: { [recipe.idMeal]: recipeIngredients } }));
      setStartRecipe(true);
      return true;
    }
    if (!recipeDoing && !recipe.strArea) {
      window.localStorage.setItem('inProgressRecipes',
        JSON.stringify({ cocktails: { [recipe.idDrink]: recipeIngredients },
          meals: {} }));
      setStartRecipe(true);
      return true;
    }
    if (!recipe.strAlcoholic) {
      window.localStorage.setItem('inProgressRecipes',
        JSON.stringify({ cocktails: { ...recipeDoing.cocktails },
          meals: { ...recipeDoing.meals, [recipe.idMeal]: recipeIngredients } }));
      setStartRecipe(true);
      return true;
    }
    if (!recipe.strArea) {
      window.localStorage.setItem('inProgressRecipes',
        JSON.stringify({ cocktails: { ...recipeDoing.cocktails,
          [recipe.idDrink]: recipeIngredients },
        meals: { ...recipeDoing.meals } }));
      setStartRecipe(true);
      return true;
    }
  };

  if (startRecipe) {
    if (type === 'comida') {
      return <Redirect to={ `/comidas/${idParams}/in-progress` } />;
    }
    return <Redirect to={ `/bebidas/${idParams}/in-progress` } />;
  }
  return (
    <div>
      {!done && isDoing && (
        <button
          style={ {
            position: 'fixed',
            bottom: 0,
          } }
          type="button"
          data-testid="start-recipe-btn"
          onClick={ startingRecipe }
        >
          {isDoing ? 'Continuar Receita' : 'Iniciar Receita'}
        </button>
      )}
    </div>
  );
}

ButtonDetails.defaultProps = {
  type: 'comida',
};

ButtonDetails.propTypes = {
  type: PropTypes.string,
};

export default ButtonDetails;
